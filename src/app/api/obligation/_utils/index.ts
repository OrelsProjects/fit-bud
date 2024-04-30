import { Contract, Obligation, ObligationCompleted } from "@prisma/client";

/**
 * ({ obligationCompletedId: string; userId: string; obligationId: string; completedAt: Date; })[]
 */

export type ObligationsInContract = {
  contract: Contract;
  obligations: Obligation[];
  appUser?: {
    photoURL?: string | null;
    displayName?: string | null;
  };
};

export type ObligationsInContracts = ObligationsInContract[];

export type ObligationsCompletedWithObligation = (ObligationCompleted & {
  obligation: Obligation;
})[];

/**
 * @returns Date object representing the start of the week (Sunday) at 00:00:00.000
 */
export function getStartOfTheWeekDate(sunday: boolean = true): Date {
  // Set day to 1 if it's Sunday, otherwise set it to 6 days before today
  const now = new Date();
  const day = now.getDay();
  let diff = now.getDate() - day + (day === 0 ? -6 : 1);
  if (!sunday) {
    diff += 1;
  }
  // Set hours to 0, minutes to 0, seconds to 0, milliseconds to 0
  const date = new Date(now.setDate(diff));
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @returns Date object representing the end of the week (Saturday) at 23:59:59.999
 */
export function getEndOfTheWeekDate(): Date {
  const startOfTheWeek = getStartOfTheWeekDate();
  // Set hours to 23, minutes to 59, seconds to 59, milliseconds to 999
  const endOfTheWeek = new Date(startOfTheWeek);
  endOfTheWeek.setDate(startOfTheWeek.getDate() + 6);
  endOfTheWeek.setHours(23, 59, 59, 999);
  return endOfTheWeek;
}

function isObligationDueDaily(obligation: Obligation): boolean {
  const today = new Date().getDay();
  const obligationLatestDay: number = Math.max(...obligation.days);
  return today > obligationLatestDay;
}

function isObligationDueWeekly(obligation: Obligation): boolean {
  return false; // Can't be overdue, since it's amount of times rather than specific days
}

// Obligation that is due means that it's last day to complete has passed
function isObligationDue(obligation: Obligation): boolean {
  if (obligation.repeat.toLocaleLowerCase() === "daily") {
    return isObligationDueDaily(obligation);
  } else {
    return isObligationDueWeekly(obligation);
  }
}

function isObligationCompletedWeekly(
  obligation: Obligation,
  completedObligations: ObligationCompleted[],
): boolean {
  const timesCompleted = completedObligations.filter(
    co => co.obligationId === obligation.obligationId,
  ).length;
  return timesCompleted >= (obligation.timesAWeek ?? 0);
}

function isObligationCompletedDaily(
  obligation: Obligation,
  completedObligations: ObligationCompleted[],
): boolean {
  // Find the maximum day. If the last completion is less than today, it's not completed.
  // Remember that there might be several completions for the same obligation
  const lastCompletion = completedObligations
    .filter(co => co.obligationId === obligation.obligationId)
    .findLast(co => co.obligationId === obligation.obligationId)?.completedAt;

  if (!lastCompletion) {
    return false;
  }

  const lastDayToComplete = Math.max(...obligation.days);

  return lastCompletion.getDay() >= lastDayToComplete;
}

function isObligationCompleted(
  obligation: Obligation,
  completedObligations: ObligationCompleted[],
): boolean {
  if (obligation.repeat.toLocaleLowerCase() === "daily") {
    return isObligationCompletedDaily(obligation, completedObligations);
  } else {
    return isObligationCompletedWeekly(obligation, completedObligations);
  }
}

/**
 * @param weeksCompletedObligations are the obligations that have been completed in the this week.
 * @param weeksObligationsInContracts are the obligations that are in the contracts.
 * @returns the obligations that are due to be completed in the current week.
 */
export function getObligationsToComplete(
  weeksCompletedObligations: ObligationCompleted[],
  weeksObligationsInContracts: ObligationsInContracts,
): ObligationsInContracts {
  let obligationsInContractsToComplete: ObligationsInContracts = [];

  for (const obligationsInContract of weeksObligationsInContracts) {
    // Possible obligations to complete
    const obligationsNotDue = obligationsInContract.obligations.filter(
      obligation => !isObligationDue(obligation),
    );
    const obligationsToComplete = obligationsNotDue.filter(
      obligation =>
        !isObligationCompleted(obligation, weeksCompletedObligations),
    );
    if (obligationsToComplete.length === 0) {
      continue;
    }

    obligationsInContractsToComplete.push({
      contract: obligationsInContract.contract,
      obligations: obligationsToComplete,
      appUser: obligationsInContract.appUser,
    });
  }

  return obligationsInContractsToComplete;
}
