/**
 * d3.tip
 * Copyright (c) 2013-2017 Justin Palmer
 *
 * Tooltips for d3.js SVG visualizations
 */
!function(t,e){if("function"==typeof define&&define.amd)define(["d3-collection","d3-selection"],e);else if("object"==typeof module&&module.exports){var n=require("d3-collection"),r=require("d3-selection");module.exports=e(n,r)}else{var o=t.d3;t.d3.tip=e(o,o)}}(window,function(l,v){return function(){var u=function(){return"n"},a=function(){return[0,0]},c=function(){return" "},p=document.body,n=t(),r=null,s=null,y=null;function d(t){var e;e=t.node(),(r=e?"svg"===e.tagName.toLowerCase()?e:e.ownerSVGElement:null)&&(s=r.createSVGPoint(),p.appendChild(n))}d.show=function(){var t=Array.prototype.slice.call(arguments);t[t.length-1]instanceof SVGElement&&(y=t.pop());var e,n=c.apply(this,t),r=a.apply(this,t),o=u.apply(this,t),l=x(),i=h.length,f=document.documentElement.scrollTop||p.scrollTop,s=document.documentElement.scrollLeft||p.scrollLeft;for(l.html(n).style("opacity",1).style("pointer-events","all");i--;)l.classed(h[i],!1);return e=m.get(o).apply(this),l.classed(o,!0).style("top",e.top+r[0]+f+"px").style("left",e.left+r[1]+s+"px"),d},d.hide=function(){return x().style("opacity",0).style("pointer-events","none"),d},d.attr=function(t,e){if(arguments.length<2&&"string"==typeof t)return x().attr(t);var n=Array.prototype.slice.call(arguments);return v.selection.prototype.attr.apply(x(),n),d},d.style=function(t,e){if(arguments.length<2&&"string"==typeof t)return x().style(t);var n=Array.prototype.slice.call(arguments);return v.selection.prototype.style.apply(x(),n),d},d.direction=function(t){return arguments.length?(u=null==t?t:o(t),d):u},d.offset=function(t){return arguments.length?(a=null==t?t:o(t),d):a},d.html=function(t){return arguments.length?(c=null==t?t:o(t),d):c},d.rootElement=function(t){return arguments.length?(p=null==t?t:o(t),d):p},d.destroy=function(){return n&&(x().remove(),n=null),d};var m=l.map({n:function(){var t=e();return{top:t.n.y-n.offsetHeight,left:t.n.x-n.offsetWidth/2}},s:function(){var t=e();return{top:t.s.y,left:t.s.x-n.offsetWidth/2}},e:function(){var t=e();return{top:t.e.y-n.offsetHeight/2,left:t.e.x}},w:function(){var t=e();return{top:t.w.y-n.offsetHeight/2,left:t.w.x-n.offsetWidth}},nw:function(){var t=e();return{top:t.nw.y-n.offsetHeight,left:t.nw.x-n.offsetWidth}},ne:function(){var t=e();return{top:t.ne.y-n.offsetHeight,left:t.ne.x}},sw:function(){var t=e();return{top:t.sw.y,left:t.sw.x-n.offsetWidth}},se:function(){var t=e();return{top:t.se.y,left:t.se.x}}}),h=m.keys();function t(){var t=v.select(document.createElement("div"));return t.style("position","absolute").style("top",0).style("opacity",0).style("pointer-events","none").style("box-sizing","border-box"),t.node()}function x(){return null==n&&(n=t(),p.appendChild(n)),v.select(n)}function e(){for(var t=y||v.event.target;null==t.getScreenCTM&&null==t.parentNode;)t=t.parentNode;var e={},n=t.getScreenCTM(),r=t.getBBox(),o=r.width,l=r.height,i=r.x,f=r.y;return s.x=i,s.y=f,e.nw=s.matrixTransform(n),s.x+=o,e.ne=s.matrixTransform(n),s.y+=l,e.se=s.matrixTransform(n),s.x-=o,e.sw=s.matrixTransform(n),s.y-=l/2,e.w=s.matrixTransform(n),s.x+=o,e.e=s.matrixTransform(n),s.x-=o/2,s.y-=l/2,e.n=s.matrixTransform(n),s.y+=l,e.s=s.matrixTransform(n),e}function o(t){return"function"==typeof t?t:function(){return t}}return d}});


/**
 * Built this as a coding challenge in Adam Janes' Udemy course
 * https://www.udemy.com/masteringd3js
 */
//const dataUrl = 'https://raw.githubusercontent.com/adamjanes/udemy-d3/master/05/5.10.1/data/data.json'
const dataUrl = './data/conductivity.json'

const config = {
  chart: {
    width: 600,
    height: 100,
  },
  margin: {
    left: 120,
    right: 50,
    top: 50,
    bottom: 100,
  },
  intervalDuration: 100,
}

const chartBounds = {
  width: config.chart.width + config.margin.left + config.margin.right,
  height: config.chart.height + config.margin.top + config.margin.bottom,
}
  
const root = d3
  .select('#chart-areac')
  .append('svg')
    .attr('width', chartBounds.width)
    .attr('height', chartBounds.height)
    .attr('viewBox', `0 0 ${chartBounds.width-100} ${chartBounds.height-100}`)
    .attr('class', 'background-image') // Add this line to set a CSS class
  .append('g')
    .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`)


const scaleX = d3
  .scaleLinear()
  //.base(10)
  .domain([0, 5000])
  .range([0, config.chart.width])

const scaleY = d3
  .scaleLinear()
  .domain([400, 800])
  .range([config.chart.height, 0])

const area = d3
  .scaleLinear()
  .range([25 * Math.PI, 2500 * Math.PI])
  .domain([2000, 1400000000]);

const continents = ['DL-CTD-001', 'asia', 'americas', 'africa'];
const continentColors = d3.schemeCategory10
const scaleColors = d3
  .scaleOrdinal(continentColors)
  .domain(continents)

const xAxisCreator = d3
  .axisBottom(scaleX)
  .tickFormat(v => +v)
  .tickValues([500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000])
  //  .tickFormat(d3.format('$,.0f'))

const yAxisCreator = d3
  .axisLeft(scaleY)
  .tickFormat(v => +v)
  
const xAxisGroup = root
  .append('g')
  //.attr('transform', `translate(0, ${config.chart.height})`)
  .call(xAxisCreator)

const yAxisGroup = root
  .append('g')
  .call(yAxisCreator)


const yLabel = root
.append('text')
  .attr('x', -config.chart.height / 2)
  .attr('y', -config.margin.left / 2)
  .attr('font-size', '20px')
  .attr('font-weight', 'bold')
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text('Waterdepth')
  
const xLabel = root
  .append('text')
    .attr('x', config.chart.width / 2)
    .attr('y', -15) //config.margin.top + config.chart.height)
    .attr('font-size', '20px')
    .attr('font-weight', 'bold')
    .attr('text-anchor', 'middle')
    .text('Conductivity')




const yearLabel = root
  .append('text')
    .attr('x', config.chart.width)
    .attr('y', config.chart.height + 20)
    .attr('font-size', '20px')
    .attr('font-weight', 'bold')
    .attr('text-anchor', 'end')
    .attr('fill', 'green')
    .text('')

const legendPos = {
  x: config.chart.width - 10,
  y: config.chart.height - 125,
}
const legend = root
  .append('g')
    .attr('transform', `translate(${legendPos.x}, ${legendPos.y})`)

continents.forEach((continent, i) => {
  const legendRow = legend
    .append('g')
      .attr('transform', `translate(0, ${i * 20})`)
  
  legendRow
    .append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', continentColors[i])
  
  legendRow
    .append('text')
      .attr('x', -10)
      .attr('y', 10)
      .attr('text-anchor', 'end')
      .style('text-transform', 'capitalize')
      //.text(continent)
})

const tip = d3.tip()
  .attr('class', 'd3-tip')
  .html(d => {
    return (`
<strong>Sensor name: </strong> <span style='color: yellow'>${d.Sensor}</span><br>
<strong>Waterdepth</strong> <span style='color: yellow'>${(d.Waterdepth)}</span><br>
<strong>Conductivity</strong> <span style='color: yellow'>${(d.Conductivity)}</span><br>
<strong>Value (cm): </strong> <span style='color: yellow'>${(d.Temperature)}</span><br>
`)
             })
root.call(tip)

const playBtn = d3.select('#play-button')
const resetBtn = d3.select('#reset-button')
const continentSelect = d3.select('#continent-select')

let time = 0
let interval = null

d3.json(dataUrl).then(rawData => {
  
  const data = rawData.map(dataSet => {
    return {
      ...dataSet,
      items: dataSet.items
        .filter(Sensor => Sensor.Temperature && Sensor.Conductivity && Sensor.Waterdepth)  
        .map(Sensor => ({
          ...Sensor,
          Conductivity: +Sensor.Conductivity,
          Waterdepth: +Sensor.Waterdepth,
        }))
    }
  })
  const getNext = () => data[time++ % data.length]
  const step = () => update(getNext())

  playBtn.on('click', () => {
    if (playBtn.text() === 'Play') {
      playBtn.text('Pause')
      interval = setInterval(step, config.intervalDuration)
    } else {
      playBtn.text('Play')
      clearInterval(interval)
    }
  })
  
  resetBtn.on('click', () => {
    time = 0
    playBtn.text('Play')
    clearInterval(interval)
    update(data[time])
  })
  
  continentSelect.on('change', () => {
    update(data[time])
  })

  
  step()
  
})

function update(dataSet) {
  yearLabel.text(dataSet.year);
  
  const selectedContinent = continentSelect.property('value');
  const items = dataSet.items.filter(Sensor => {
    return selectedContinent === 'all' || selectedContinent === Sensor.continent;
  });
  
  const circles = root.selectAll('circle').data(items, d => d.Sensor);
  
  circles
    .exit()
      .attr('r', 0)
      .attr('opacity', 0)
    .remove();
  
  circles
    .enter()
      .append('circle')
        .attr('cx', d => scaleX(d.Conductivity))
        .attr('cy', d => scaleY(d.Waterdepth))
        .attr('opacity', 0)
        .attr('stroke', '#333')
        .attr('stroke-width', 2)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
    .merge(circles)
      .transition()
        .duration(config.intervalDuration)
        .ease(d3.easeLinear)
        .attr('opacity', 0.9)
        .attr('cx', d => scaleX(d.Conductivity))
        .attr('cy', d => scaleY(d.Waterdepth))
        .attr('r', d => Math.sqrt(area(d.Temperature)*10 / Math.PI))
        //.attr('r', d => (d.Temperature) / 70)
        .attr('fill', d => scaleColors(d.Temperature));
  
  //const datesCount = slider.slider('option', 'max');
  const currentDate = new Date(dataSet.date); // Parse the date string
  const currentTime = currentDate.getTime(); // Get the time value of the date
  
}

