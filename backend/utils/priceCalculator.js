function calculatePricing(basePrice, rules = [], courtType, hour, day, equipmentCost, coachCost) {
  let price = basePrice;

  let breakdown = {
    basePrice,
    peakHourFee: 0,
    weekendFee: 0,
    indoorFee: 0,
    equipmentFee: equipmentCost,
    coachFee: coachCost,
    total: 0,
  };

  if (!Array.isArray(rules)) rules = [];

  rules.forEach(r => {
    if (!r) return;

    // Peak Hour Rules
    if (r.type === "peak" && hour >= r.start && hour < r.end) {
      const increased = price * (r.multiplier - 1);
      price *= r.multiplier;
      breakdown.peakHourFee = increased;
    }

    // Weekend Rule
    if (r.type === "weekend" && (day === 0 || day === 6)) {
      price += r.surcharge;
      breakdown.weekendFee = r.surcharge;
    }

    // Indoor Rule
    if (r.type === "indoor" && courtType === "indoor") {
      price += r.surcharge;
      breakdown.indoorFee = r.surcharge;
    }
  });

  breakdown.total = price + equipmentCost + coachCost;
  return breakdown;
}

module.exports = calculatePricing;
