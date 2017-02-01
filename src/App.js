import React, { Component } from 'react';
import './App.css';


let initialContents = `
---
layout: post
title:  "Optimal redistribution with a flat tax"
date:   2016-10-07
tags:
  economics
  math
---

Suppose you have a bunch of people who differ only in their wage $$w$$. Everyone has utility logarithmic in their consumption. As the government, you want to promote welfare by redistributing consumption. You decide to do this by instituting a flat tax and using it to fund a universal basic income.

The more revenue you raise with your tax, the higher the UBI can be. But if you raise the tax too high, you will excessively deter people from working. So what's the optimal tax rate?

Somewhat surprisingly, Ben Weinstein-Raun and I managed to find an analytical solution to this problem. The optimal flat tax rate is a simple function of the wage distribution:

$^$\\text{Optimal flat tax rate} = 1 - \\frac{\\text{Harmonic mean of wages}}{\\text{Arithmetic mean of wages}}$^$

The functional form checks out: Harmonic mean equals arithmetic mean on a set which is perfectly equal; in that case the fraction will be 1 and the tax rate will be 0. Inequality causes the harmonic mean to become smaller than the arithmetic mean; at most, the fraction might go to 0 and the tax rate will approach 100%.

Another way of phrasing that fraction is "the average time it takes for someone to make a dollar, multiplied by the average wage".

I did most of the algebra in Sympy; almost all of the math I write here is replicated in [this Python script](https://github.com/bshlgrs/economics-demos/blob/master/python/optimal_tax.py), which I also put online as a Sage workbook [here](https://cloud.sagemath.com/projects/0a4323fd-9bc8-4276-a48c-cb0de6ecf3fe/files/2016-10-11-195016.html). Because of that, I'm reasonably confident in this result.

## Proof

Let's define all our variables:

- $$ w $$ is the wage of an individual
- $$r$$ is 1 minus the tax rate
- $$h$$ is the amount of time that a person works, in some unit. The units don't affect the optimal tax rate.
- $$c$$ is the UBI
- $$u$$ is utility
- $$y$$ is the pre-tax, pre-transfers income of an individual, $$Y$$ is the income of all of society
- there are $$n$$ people. The set of people is $$P$$.

So individuals have utility $$ u = \\log(w \\cdot h \\cdot r + c) - h$$.

### What is individual behavior, as a function of $$r$$ and $$c$$?

First we find the optimal hours worked for an individual by differentiating utility with respect to hours worked:

$^$\\frac{du}{dh} = \\frac{w \\cdot r}{w \\cdot h \\cdot r + c} - 1$^$

Setting the derivative to 0 and solving for $$h$$, you get

$^$h = 1 - \\frac{c}{r \\cdot w} $^$

Let's check functional form--we expect workers to work more if they have lower UBI, lower taxes, or higher wages. This function has all those behaviors (remember that $$r$$ is the proportion of your income you get to keep, not the tax rate).

The optimal income is that time multiplied by $$w$$, so:

$^$y = w - \\frac{c}{r}$^$

Note that this means that everyone forgoes the same amount of income due to the distortionary effects of the UBI and taxes.

At this income, utility for an individual is:

$^$u = \\log(r) - 1 + \\log(w) + \\frac{c}{r\\cdot w}$^$

And utility over all of society is therefore:

$^$U = n\\cdot\\log(r) - n + \\sum_{p \\in P}\\log(w_p) + \\frac{c}{r\\cdot w_p}$^$

We can rewrite this to

$^$U = n\\cdot\\log(r) - n + \\sum_{p \\in P}\\left[\\log(w_p)\\right] + \\frac{c}{r} \\cdot \\sum_{p \\in P} \\left[\\frac{1}{w_p} \\right]$^$

#### Total societal income

Given $$r$$ and $$c$$, the income of the whole population is

$$\\begin{aligned}
  Y &= \\sum_{p \\in P} y_p \\\\
   &=  \\sum_{p \\in P} \\left(w_p - \\frac{c}{r}\\right)
\\end{aligned}$$

Conveniently, the $$\\frac{c}{r}$$ term is constant in the sum, so we can take it out:

$$\\begin{aligned}
 Y  &=  - \\frac{n \\cdot c}{r} + \\sum_{p \\in P} w_p \\\\
    &=  -\\frac{n \\cdot c}{r} + W
\\end{aligned}$$

where the total wage of the whole population is $$W = \\sum_{p \\in P} w_p$$.

### What is $$c$$, given $$r$$?

At a given tax rate $$r$$, the UBI (by definition) is:

$^$c = \\frac{1-r}{n} \\cdot Y $^$

We can substitute the other expression we found for $$Y$$ above into this equation:

$^$c = \\frac{1-r}{n} \\cdot \\left( -\\frac{n \\cdot c}{r} + W \\right) $^$

and solve for $$c$$, which gets us

$^$c = \\frac{-r \\cdot W \\cdot (r - 1)}n$^$

So given a tax rate, we now know the equilibrium UBI.

### What is $$U$$, given $$r$$?

We can now substitute the equilibrium UBI into our global utility formula to determine global utility at this tax rate:

$^$U = n\\cdot(\\log(r) - 1) + \\sum_{p \\in P}\\left[\\log(w_p)\\right] - \\frac{\\sum_{p \\in P}\\left[\\frac{1}{w_p}\\right]\\cdot W\\cdot(r - 1)}n$^$

### What is the optimal choice of $$r$$?

Now we differentiate $$U$$ with respect to $$r$$:

$^$\\frac{dU}{dr} = \\frac{-\\sum_{p \\in P}\\left[\\frac{1}{w_p}\\right] \\cdot W}{n} + \\frac{n}{r}$^$

Set this to zero and solve for $$r$$, and you get:

$^$\\frac{n^2}{\\sum_{p \\in P}\\left[\\frac{1}{w_p}\\right] \\cdot W}$^$

Remember that $$W$$ is the sum of wages. So this can be written as

$^$\\frac{n^2}{\\sum_{p \\in P}\\left[\\frac{1}{w_p}\\right] \\cdot \\sum_{p \\in P}\\left[w_p\\right]}$^$

I [posted on Facebook](https://www.facebook.com/photo.php?fbid=10208780739570567&set=a.1254922647920.38754.1075180788&type=3) asking for someone to make sense of this expression for me. Matt Alger and Ben Weinstein-Raun both figured out that it is the harmonic mean of the wages divided by the arithmetic mean of the wages.

So overall:

$^$\\text{Optimal flat tax rate} = 1 - \\frac{\\text{Harmonic mean of wages}}{\\text{Arithmetic mean of wages}}$^$

## Further questions

I am interested to see if this process could be extended to find optimal tax structures for other situations. For example:

- What happens if people have different levels of avarice: that is, some of them get more pleasure from money than others?
- What happens if leisure time has diminishing marginal returns?
- What about if we don't want to be restricted to a flat tax? Can we solve for the optimal tax function, where a tax function is a function from different pre-tax incomes to post-tax incomes?

I should also look harder to see if my result here is already known in the optimal tax literature. My impression is that economists aren't that interested in this particular question, because they don't like the rigidity of my assumed utility function. But I still think this result is really neat, and I'm very glad to know it.

<!-- ## Other work

- **Sheshinski, 1971: ["The Optimal Linear Income Tax"](http://darp.lse.ac.uk/papersdb/Sheshinski_(REStud_72).pdf)**. This discusses a more general version of the problem, where we have a flat tax but utility isn't assumed to be logarithmic in consumption and linear in leisure.
- **Slemrod et al, 1992: ["The optimal two-bracket linear income tax"](https://deepblue.lib.umich.edu/bitstream/handle/2027.42/31813/0000759.pdf?sequence=1&isAllowed=y). This doesn't contain this result.
 -->

---

[view comments on Facebook here](https://www.facebook.com/bshlgrs/posts/10208786840283081)
`;

import EditDocument from './components/EditDocument'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { contents: initialContents, title: null };
  }

  render () {
    return <EditDocument
      contents={this.state.contents}
      changeContents={(v) => this.setState({contents: v})}
      title={this.state.title}
      changeTitle={(v) => this.setState({title: v})}
    />
  }
}



export default App;
