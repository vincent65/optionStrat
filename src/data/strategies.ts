export interface Strategy {
  id: string;
  name: string;
  description: string;
  icon: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  profitPotential: 'Limited' | 'Unlimited';
}

export const strategies: Strategy[] = [
  {
    id: 'long-call',
    name: 'Long Call',
    description: 'A basic bullish strategy involving the purchase of a call option, allowing unlimited upside potential with limited downside risk.',
    icon: '/icons/long-call.svg',
    riskLevel: 'Moderate',
    profitPotential: 'Unlimited',
  },
  {
    id: 'long-put',
    name: 'Long Put',
    description: 'A basic bearish strategy involving the purchase of a put option, offering significant profit potential if the underlying asset decreases in value.',
    icon: '/icons/long-put.svg',
    riskLevel: 'Moderate',
    profitPotential: 'Limited',
  },
  {
    id: 'covered-call',
    name: 'Covered Call',
    description: 'An income-generating strategy where a call option is sold against owned stock, offering limited profit and reduced downside risk.',
    icon: '/icons/covered-call.svg',
    riskLevel: 'Low',
    profitPotential: 'Limited',
  },
  {
    id: 'cash-secured-put',
    name: 'Cash-Secured Put',
    description: 'An income strategy where a put option is sold while reserving enough cash to purchase the underlying asset if assigned.',
    icon: '/icons/cash-secured-put.svg',
    riskLevel: 'Low',
    profitPotential: 'Limited',
  },
  {
    id: 'protective-put',
    name: 'Protective Put',
    description: 'A risk-management strategy involving the purchase of a put option to protect against downside risk in an underlying asset.',
    icon: '/icons/protective-put.svg',
    riskLevel: 'Low',
    profitPotential: 'Limited',
  },
  {
    id: 'bull-put-spread',
    name: 'Bull Put Spread',
    description: 'A credit spread strategy that profits in a moderately bullish market by selling a put and buying a lower strike put.',
    icon: '/icons/bull-put-spread.svg',
    riskLevel: 'Low',
    profitPotential: 'Limited',
  },
  {
    id: 'bear-call-spread',
    name: 'Bear Call Spread',
    description: 'A credit spread strategy that profits in a moderately bearish market by selling a call and buying a higher strike call.',
    icon: '/icons/bear-call-spread.svg',
    riskLevel: 'Low',
    profitPotential: 'Limited',
  },
  {
    id: 'bull-call-spread',
    name: 'Bull Call Spread',
    description: 'A debit spread strategy that profits in a bullish market by buying a call and selling a higher strike call.',
    icon: '/icons/bull-call-spread.svg',
    riskLevel: 'Moderate',
    profitPotential: 'Limited',
  },
  {
    id: 'bear-put-spread',
    name: 'Bear Put Spread',
    description: 'A debit spread strategy that profits in a bearish market by buying a put and selling a lower strike put.',
    icon: '/icons/bear-put-spread.svg',
    riskLevel: 'Moderate',
    profitPotential: 'Limited',
  },
  {
    id: 'iron-butterfly',
    name: 'Iron Butterfly',
    description: 'A neutral strategy combining a bull put spread and a bear call spread with the same center strike, offering limited risk and reward.',
    icon: '/icons/iron-butterfly.svg',
    riskLevel: 'Low',
    profitPotential: 'Limited',
  },
  {
    id: 'straddle',
    name: 'Straddle',
    description: 'A directional strategy that profits from significant price movement in either direction by buying a call and a put at the same strike.',
    icon: '/icons/straddle.svg',
    riskLevel: 'High',
    profitPotential: 'Unlimited',
  },
  {
    id: 'strangle',
    name: 'Strangle',
    description: 'A directional strategy that profits from significant price movement by buying a call and a put at different strikes.',
    icon: '/icons/strangle.svg',
    riskLevel: 'High',
    profitPotential: 'Unlimited',
  },
  {
    id: 'calendar-call-spread',
    name: 'Calendar Call Spread',
    description: 'A calendar spread strategy using call options to profit from time decay and minimal movement in the underlying asset.',
    icon: '/icons/calendar-call-spread.svg',
    riskLevel: 'Moderate',
    profitPotential: 'Limited',
  },
  {
    id: 'diagonal-call-spread',
    name: 'Diagonal Call Spread',
    description: 'A hybrid strategy combining elements of a calendar spread and a vertical spread to profit from time decay and directional movement.',
    icon: '/icons/diagonal-call-spread.svg',
    riskLevel: 'Moderate',
    profitPotential: 'Limited',
  },
  {
    id: 'collar',
    name: 'Collar',
    description: 'A protective strategy involving the simultaneous purchase of a put and sale of a call to limit both upside and downside risk.',
    icon: '/icons/collar.svg',
    riskLevel: 'Low',
    profitPotential: 'Limited',
  },
  // Add any other strategies from the image as needed
];
