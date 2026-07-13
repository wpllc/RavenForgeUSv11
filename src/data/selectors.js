import { assetsList, reviewQueueList, auditTimelineList, evidenceLedger } from './demoData';

/**
 * Calculates the number of pending reviews dynamically.
 */
export function getPendingReviewCount(reviews = reviewQueueList) {
  return reviews.filter(r => r.status === 'PENDING').length;
}

/**
 * Sorts assets so that critical and high priority items appear first.
 */
export function getPriorityAssets(assets = assetsList) {
  const priorityOrder = { 'Critical': 4, 'High': 3, 'Action Required': 3, 'Monitor': 2, 'Routine': 1 };
  
  return [...assets].sort((a, b) => {
    const valA = priorityOrder[a.priority] || priorityOrder[a.condition] || 0;
    const valB = priorityOrder[b.priority] || priorityOrder[b.condition] || 0;
    return valB - valA;
  });
}

/**
 * Calculates the count of assets falling into each condition class.
 */
export function getConditionDistribution(assets = assetsList) {
  const counts = { Critical: 0, Poor: 0, Fair: 0, Good: 0, Unknown: 0 };
  assets.forEach(asset => {
    const cond = asset.condition;
    if (counts[cond] !== undefined) {
      counts[cond]++;
    } else {
      counts.Unknown++;
    }
  });
  return counts;
}

/**
 * Determines the primary operational status based on findings, conditions, and pending reviews.
 */
export function getAssessmentStatus(assets = assetsList, reviews = reviewQueueList) {
  const pendingReviews = getPendingReviewCount(reviews);
  const criticalAssets = assets.filter(a => a.condition === 'Critical' || a.priority === 'Critical');
  const actionRequiredAssets = assets.filter(a => a.condition === 'Poor' || a.priority === 'High' || a.priority === 'Action Required');

  if (criticalAssets.length > 0 || actionRequiredAssets.length > 0) {
    return {
      label: 'Action Required',
      description: `${criticalAssets.length + actionRequiredAssets.length} assets require priority planning intervention.`,
      severity: 'red'
    };
  }

  if (pendingReviews > 0) {
    return {
      label: 'Review Required',
      description: `${pendingReviews} verification items are awaiting operator review.`,
      severity: 'amber'
    };
  }

  return {
    label: 'Assessment Complete',
    description: 'All assets evaluated with no outstanding alerts.',
    severity: 'green'
  };
}

/**
 * Returns the recent activity entries format in plain-English.
 */
export function getRecentActivity(timeline = auditTimelineList) {
  return timeline.slice().reverse(); // Show newest events first
}
