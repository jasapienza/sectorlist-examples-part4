// https://observablehq.com/@jasapienza/part-4-sector-lists-experiment-2-random-polygons@392
import define1 from "./7e0e77ed848d004b@2084.js";

function _1(md){return(
md`# Part 4) Sector Lists Experiment 2 - Random Polygons

In this demo, we exercise the Sector List library by creating a scalar field from a number of polygons and
then apply a _scalar transformation_ to it. The idea is to assess the efficiency and correctness of our implementation.

We start by importing the library and some utilities:`
)}

function _3(cell){return(
cell`import { SectorList, fieldRender, cell, Legend } from "@jasapienza/part-2-sector-list-examples"`
)}

function _4(md){return(
md`## Polygon generation

Our test polygon generator creates random "star" polygons, i.e., their vertices are generated around a center point at different distances and angles. Shapes are controlled by three parameters: (1) the number of vertices, (2) an _"irregularity"_ factor (0 yields constant angles) and (3) a _"spikiness"_ factor, which controls the radius variation (0 yields constants radii).
The demo below demonstrates this:`
)}

function _shapeParams(Inputs){return(
Inputs.form({
  irregularity: Inputs.range([0, 1], {
    label: "Irregularity",
    step: 0.01,
    value: 0.5
  }),
  spikiness: Inputs.range([0, 0.5], {
    label: "Spikiness",
    step: 0.01,
    value: 0.2
  }),
  nvtx: Inputs.range([3, 50], {
    label: "Vertices",
    step: 1,
    value: 10
  })
})
)}

function _6(DOM,poly)
{
  const ctx = DOM.context2d(500, 500, 1);
  ctx.beginPath();
  for (let p of poly) {
    ctx.lineTo(...p);
  }
  ctx.closePath();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "lightgray";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  return ctx.canvas;
}


function _poly(randomPolygon,shapeParams){return(
randomPolygon(
  [250, 250],
  120,
  shapeParams.nvtx,
  shapeParams.irregularity,
  shapeParams.spikiness
)
)}

function _8(cell){return(
cell`poly = randomPolygon(
  [250, 250],
  120,
  shapeParams.nvtx,
  shapeParams.irregularity,
  shapeParams.spikiness
)`
)}

function _9(md){return(
md`## Covering a square with random polygons

A test set of polygons is generated so as to have a given _average coverage_ within a square. A coverage of _k_ means that the summed area of all polygons is _k_ times bigger than the area of the square. The demo below illustrates this. Notice that polygons are generated using the shape parameters selected above.`
)}

function _coverParams(Inputs){return(
new Inputs.form({
  avgCover: Inputs.range([0.2, 4], { label: "Avg coverage", value: 1 }),
  polygonCount: Inputs.range([5, 200], {
    label: "Polygon count",
    value: 50,
    step: 1
  })
})
)}

function _11(DOM,polygons)
{
  const ctx = DOM.context2d(500, 500, 1);
  ctx.strokeStyle = "black";
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  for (let poly of polygons) {
    ctx.beginPath();
    for (let p of poly) {
      ctx.lineTo(...p);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  return ctx.canvas;
}


function _12(cell){return(
cell`{
  const ctx = DOM.context2d(500, 500, 1);
  ctx.strokeStyle = "black";
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  for (let poly of polygons) {
    ctx.beginPath();
    for (let p of poly) {
      ctx.lineTo(...p);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  return ctx.canvas;
}`
)}

function _polygons(coverSquarePolygons,coverParams,shapeParams){return(
coverSquarePolygons(
  500,
  coverParams.avgCover,
  coverParams.polygonCount,
  shapeParams.nvtx,
  shapeParams.irregularity,
  shapeParams.spikiness
)
)}

function _14(cell){return(
cell`polygons = coverSquarePolygons(
  500,
  coverParams.avgCover,
  coverParams.polygonCount,
  shapeParams.nvtx,
  shapeParams.irregularity,
  shapeParams.spikiness
)`
)}

function _15(tex,md){return(
md`### A sector list for the polygon collection

The collection of polygons is converted to a single scalar field ${tex`S`} such that ${tex`S(p)=n`} if ${tex`p`} is inside ${tex`n`} polygons. Clearly, the average value of ${tex`n`} is the _average coverage_ parameter selected above.`
)}

function _polygonField(polygons,SectorList)
{
  let sectors = [];
  for (let poly of polygons)
    sectors.push(...SectorList.convertFrom(poly.flat(), 1).sectors);

  return SectorList.fromSectorArray(sectors);
}


function _17(cell){return(
cell`polygonField = {
  let sectors = [];
  for (let poly of polygons)
    sectors.push(...SectorList.convertFrom(poly.flat(), 1).sectors);

  return SectorList.fromSectorArray(sectors);
}`
)}

function _fieldColor(d3){return(
d3.scaleOrdinal(d3.range(20), [
  "#fccccc",
  ...d3.range(19).map((x) => d3.interpolateBlues(x / 18))
])
)}

function _19(cell){return(
cell`fieldColor = d3.scaleOrdinal(d3.range(20), [
  "#fccccc",
  ...d3.range(19).map((x) => d3.interpolateBlues(x / 18))
])`
)}

function _showEdges(Inputs){return(
Inputs.toggle({ label: "Show Edges", value: false })
)}

function _21(Legend,fieldColor){return(
Legend(fieldColor)
)}

function _22(cell){return(
cell`Legend(fieldColor)`
)}

function _23(fieldRender,polygonField,fieldColor,showEdges){return(
fieldRender(polygonField, {
  fieldColor,
  showEdges,
  tooltipMap: showEdges ? null : "auto"
})
)}

function _24(cell){return(
cell`fieldRender(polygonField, {
  fieldColor,
  showEdges,
  tooltipMap: showEdges ? null : "auto"
})`
)}

function _25(md){return(
md`### Applying a scalar transformation to the field

We apply an _odd/even_ scalar transformation to the field shown above. This is a transformation that maps the areas covered by an odd number of polygons to 1 and the rest to 0.`
)}

function _oddPolygonField(polygonField){return(
polygonField.scalarTransformation((x) => (x % 2 == 1 ? 1 : 0))
)}

function _27(cell){return(
cell`oddPolygonField = polygonField.scalarTransformation((x) => (x % 2 == 1 ? 1 : 0))`
)}

function _28(fieldRender,oddPolygonField,d3,showEdges){return(
fieldRender(oddPolygonField, {
  fieldColor: d3.scaleOrdinal(d3.range(20), [
  "#fff",
  "#aaa"
]),
  showEdges,
  tooltipMap: showEdges ? null : "auto"
})
)}

function _29(cell){return(
cell`fieldRender(oddPolygonField, {
  fieldColor: d3.scaleOrdinal(d3.range(20), [
  "#fff",
  "#aaa"
]),
  showEdges,
  tooltipMap: showEdges ? null : "auto"
})`
)}

function _30(md){return(
md`## Performance charts

The charts below plot measurements taken when performing the _odd/even_ scalar transformation on polygon sets of varying cardinality (up to 200) but equal average coverage. Clearly, higher average coverages lead to larger numbers of intersections and lower performance.

Since computing the data may take some time and slow down the interaction for the demos above, you must turn on the *Show plot* checkbox to start collecting the data and plotting of the results. `
)}

function _showPlot(Inputs){return(
Inputs.toggle({ label: "Show plot", value: false })
)}

function* _32(showPlot,htl,$0,coverSquarePolygons,coverParams,shapeParams,SectorList,Plot)
{
  if (!showPlot) {
    yield htl.html`<h1 style="padding:50px; background:lightgray; text-align:center; width:200px;">Plotting disabled</h1>`;
  } else {
    let data = [];
    $0.value = data;
    for (let npoly = 10; npoly < 200; npoly += 2) {
      // Do an average over several runs with the same parameters
      for (let i = 0; i < 5; i++) {
        // Create polygon set
        let polygons = coverSquarePolygons(
          500,
          coverParams.avgCover,
          npoly,
          shapeParams.nvtx,
          shapeParams.irregularity,
          shapeParams.spikiness
        );
        // Create field sector list
        let sectors = [];
        for (let poly of polygons)
          sectors.push(...SectorList.convertFrom(poly.flat(), 1).sectors);
        let polyField = SectorList.fromSectorArray(sectors);
        // Time the transformation
        let start = performance.now();
        let oddPolyField = polyField.scalarTransformation((x) =>
          x % 2 == 1 ? 1 : 0
        );
        let finish = performance.now();
        // Collect data
        data.push({
          npoly,
          nvtx: npoly * shapeParams.nvtx,
          fieldSectors: sectors.length,
          transformedSectors: oddPolyField.sectors.length,
          time: finish - start
        });
      }
      // Create charts
      const timeByPolygonVertices = Plot.plot({
        marginLeft: 50,
        y: {
          grid: true,
          label: "↑ time (ms)"
        },
        x: {
          label: "total number of polygon vertices →"
        },
        marks: [
          Plot.frame(),
          Plot.line(
            data,
            Plot.groupX(
              { y: "mean" },
              {
                x: "nvtx",
                y: "time"
              }
            )
          )
        ]
      });
      const timeByTransformed = Plot.plot({
        marginLeft: 50,
        y: {
          grid: true,
          label: "↑ time (ms)"
        },
        x: {
          label: "sectors in transformed field →"
        },
        marks: [
          Plot.frame(),
          Plot.line(
            data,
            Plot.groupX(
              { y: "mean" },
              {
                x: "transformedSectors",
                sort: "transformedSectors",
                y: "time"
              }
            )
          )
        ]
      });
      const transformedSectorsByFieldSectors = Plot.plot({
        marginLeft: 50,
        y: {
          grid: true,
          label: "↑ sectors in transformed field"
        },
        x: {
          label: "sectors in original field →"
        },
        marks: [
          Plot.frame(),
          Plot.line(
            data,
            Plot.groupX(
              { y: "mean" },
              {
                x: "fieldSectors",
                sort: "fieldSectors",
                y: "transformedSectors"
              }
            )
          )
        ]
      });
      yield htl.html`${timeByPolygonVertices}<br>${timeByTransformed}<br>${transformedSectorsByFieldSectors}`;
    }
  }
}


function _debug(){return(
[]
)}

function _34($0){return(
Math.max(...$0.value.map((d) => d.transformedSectors))
)}

function _35(md){return(
md`## Implementation`
)}

function _36(md){return(
md`### A random polygon generator

Based on this [Stack Overflow question](https://stackoverflow.com/questions/8997099/algorithm-to-generate-random-2d-polygon).`
)}

function _randomPolygon(randomAngleSteps,d3){return(
function randomPolygon(
  center,
  avgRadius,
  nvtx,
  irregularity = 0.5,
  spikiness = 0.5
) {
  irregularity *= (2 * Math.PI) / nvtx;
  spikiness *= avgRadius;

  const angleSteps = randomAngleSteps(nvtx, irregularity);

  let points = [];
  let angle = d3.randomUniform(0, 2 * Math.PI)();
  const randomRadius = d3.randomNormal(avgRadius, spikiness);
  for (let i = 0; i < nvtx; i++) {
    const radius = Math.min(
      2 * avgRadius,
      Math.max(0.1 * avgRadius, randomRadius())
    );
    const point = [
      center[0] + radius * Math.cos(angle),
      center[1] + radius * Math.sin(angle)
    ];
    points.push(point);
    angle += angleSteps[i];
  }

  return points;
}
)}

function _38(cell){return(
cell`//
// Generates a random polygon centered at 'center', having 'avgRadius' average
// radius and 'nvtx' vertices. Parameters irregularity and spikiness control
// the overall shape of the polygon
//
function randomPolygon(
  center,
  avgRadius,
  nvtx,
  irregularity = 0.5,
  spikiness = 0.5
) {
  irregularity *= (2 * Math.PI) / nvtx;
  spikiness *= avgRadius;

  const angleSteps = randomAngleSteps(nvtx, irregularity);

  let points = [];
  let angle = d3.randomUniform(0, 2 * Math.PI)();
  const randomRadius = d3.randomNormal(avgRadius, spikiness);
  for (let i = 0; i < nvtx; i++) {
    const radius = Math.min(
      2 * avgRadius,
      Math.max(0.1 * avgRadius, randomRadius())
    );
    const point = [
      center[0] + radius * Math.cos(angle),
      center[1] + radius * Math.sin(angle)
    ];
    points.push(point);
    angle += angleSteps[i];
  }

  return points;
}`
)}

function _randomAngleSteps(d3){return(
function randomAngleSteps(steps, irregularity) {
  // generate n angle steps
  let angles = [],
    baseStep = (2 * Math.PI) / steps;
  const lower = baseStep * (1.0001 - irregularity);
  const upper = baseStep * (1 + irregularity);
  let cumsum = 0;
  const randomAngle = d3.randomUniform(lower, upper);
  for (let i = 0; i < steps; i++) {
    let angle = randomAngle();
    angles.push(angle);
    cumsum += angle;
  }

  // normalize the steps so that point 0 and point n+1 are the same
  cumsum /= 2 * Math.PI;
  for (let i = 0; i < steps; i++) angles[i] /= cumsum;
  return angles;
}
)}

function _40(cell){return(
cell`//
// Generates the division of a circumference in random angles.
//
function randomAngleSteps(steps, irregularity) {
  // generate n angle steps
  let angles = [],
    baseStep = (2 * Math.PI) / steps;
  const lower = baseStep * (1.0001 - irregularity);
  const upper = baseStep * (1 + irregularity);
  let cumsum = 0;
  const randomAngle = d3.randomUniform(lower, upper);
  for (let i = 0; i < steps; i++) {
    let angle = randomAngle();
    angles.push(angle);
    cumsum += angle;
  }

  // normalize the steps so that point 0 and point n+1 are the same
  cumsum /= 2 * Math.PI;
  for (let i = 0; i < steps; i++) angles[i] /= cumsum;
  return angles;
}`
)}

function _coverSquarePolygons(randomPolygon,polygonArea){return(
function coverSquarePolygons(
  size,
  avgCover,
  npoly,
  nvtx,
  irregularity,
  spikiness
) {
  let polys = [];
  let totalPolyArea = 0,
    remainingArea = size ** 2 * avgCover;
  for (let ipoly = 0; ipoly < npoly; ipoly++) {
    let targetArea = remainingArea / (npoly - ipoly);
    let targetRadius = Math.sqrt(targetArea / Math.PI);
    let x = Math.random() * (size - targetRadius * 2) + targetRadius;
    let y = Math.random() * (size - targetRadius * 2) + targetRadius;
    let poly = randomPolygon(
      [x, y],
      targetRadius,
      nvtx,
      irregularity,
      spikiness
    );
    let polyArea = polygonArea(poly);
    if (polyArea < 0) throw "Negative area polygon";
    remainingArea -= polyArea;
    polys.push(poly);
  }
  return polys;
}
)}

function _42(cell){return(
cell`//
// Returns a set of 'npoly' polygons with total area 'avgCover' times that of a square with side 'size'.
// Each polygon is generated with shape governed by parameters 'nvtx', 'irregularity', and 'spikiness' (see above).
//
function coverSquarePolygons(
  size,
  avgCover,
  npoly,
  nvtx,
  irregularity,
  spikiness
) {
  let polys = [];
  let totalPolyArea = 0,
    remainingArea = size ** 2 * avgCover;
  for (let ipoly = 0; ipoly < npoly; ipoly++) {
    let targetArea = remainingArea / (npoly - ipoly);
    let targetRadius = Math.sqrt(targetArea / Math.PI);
    let x = Math.random() * (size - targetRadius * 2) + targetRadius;
    let y = Math.random() * (size - targetRadius * 2) + targetRadius;
    let poly = randomPolygon(
      [x, y],
      targetRadius,
      nvtx,
      irregularity,
      spikiness
    );
    let polyArea = polygonArea(poly);
    if (polyArea < 0) throw "Negative area polygon";
    remainingArea -= polyArea;
    polys.push(poly);
  }
  return polys;
}`
)}

function _polygonArea(){return(
function polygonArea(poly) {
  let [px, py] = poly[poly.length - 1];
  let area = 0;
  for (let [x, y] of poly) {
    area += (px - x) * (y + py);
    [px, py] = [x, y];
  }
  return area / 2;
}
)}

function _44(cell){return(
cell`//
// Returns the area of a polygon
//
function polygonArea(poly) {
  let [px, py] = poly[poly.length - 1];
  let area = 0;
  for (let [x, y] of poly) {
    area += (px - x) * (y + py);
    [px, py] = [x, y];
  }
  return area / 2;
}`
)}

function _bounds(){return(
function bounds(poly) {
  let [xmin, ymin, xmax, ymax] = [
    Number.MAX_VALUE,
    Number.MAX_VALUE,
    Number.MIN_VALUE,
    Number.MIN_VALUE
  ];
  for (let [x, y] of poly) {
    xmin = Math.min(xmin, x);
    ymin = Math.min(ymin, y);
    xmax = Math.max(xmax, x);
    ymax = Math.max(ymax, y);
  }
  return { xmin, ymin, xmax, ymax };
}
)}

function _46(cell){return(
cell`//
// Returns the bounds (min/max) of a polygon /  array of points
//
function bounds(poly) {
  let [xmin, ymin, xmax, ymax] = [
    Number.MAX_VALUE,
    Number.MAX_VALUE,
    Number.MIN_VALUE,
    Number.MIN_VALUE
  ];
  for (let [x, y] of poly) {
    xmin = Math.min(xmin, x);
    ymin = Math.min(ymin, y);
    xmax = Math.max(xmax, x);
    ymax = Math.max(ymax, y);
  }
  return { xmin, ymin, xmax, ymax };
}`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("SectorList", child1);
  main.import("fieldRender", child1);
  main.import("cell", child1);
  main.import("Legend", child1);
  main.variable(observer()).define(["cell"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof shapeParams")).define("viewof shapeParams", ["Inputs"], _shapeParams);
  main.variable(observer("shapeParams")).define("shapeParams", ["Generators", "viewof shapeParams"], (G, _) => G.input(_));
  main.variable(observer()).define(["DOM","poly"], _6);
  main.variable(observer("poly")).define("poly", ["randomPolygon","shapeParams"], _poly);
  main.variable(observer()).define(["cell"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof coverParams")).define("viewof coverParams", ["Inputs"], _coverParams);
  main.variable(observer("coverParams")).define("coverParams", ["Generators", "viewof coverParams"], (G, _) => G.input(_));
  main.variable(observer()).define(["DOM","polygons"], _11);
  main.variable(observer()).define(["cell"], _12);
  main.variable(observer("polygons")).define("polygons", ["coverSquarePolygons","coverParams","shapeParams"], _polygons);
  main.variable(observer()).define(["cell"], _14);
  main.variable(observer()).define(["tex","md"], _15);
  main.variable(observer("polygonField")).define("polygonField", ["polygons","SectorList"], _polygonField);
  main.variable(observer()).define(["cell"], _17);
  main.variable(observer("fieldColor")).define("fieldColor", ["d3"], _fieldColor);
  main.variable(observer()).define(["cell"], _19);
  main.variable(observer("viewof showEdges")).define("viewof showEdges", ["Inputs"], _showEdges);
  main.variable(observer("showEdges")).define("showEdges", ["Generators", "viewof showEdges"], (G, _) => G.input(_));
  main.variable(observer()).define(["Legend","fieldColor"], _21);
  main.variable(observer()).define(["cell"], _22);
  main.variable(observer()).define(["fieldRender","polygonField","fieldColor","showEdges"], _23);
  main.variable(observer()).define(["cell"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("oddPolygonField")).define("oddPolygonField", ["polygonField"], _oddPolygonField);
  main.variable(observer()).define(["cell"], _27);
  main.variable(observer()).define(["fieldRender","oddPolygonField","d3","showEdges"], _28);
  main.variable(observer()).define(["cell"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viewof showPlot")).define("viewof showPlot", ["Inputs"], _showPlot);
  main.variable(observer("showPlot")).define("showPlot", ["Generators", "viewof showPlot"], (G, _) => G.input(_));
  main.variable(observer()).define(["showPlot","htl","mutable debug","coverSquarePolygons","coverParams","shapeParams","SectorList","Plot"], _32);
  main.define("initial debug", _debug);
  main.variable(observer("mutable debug")).define("mutable debug", ["Mutable", "initial debug"], (M, _) => new M(_));
  main.variable(observer("debug")).define("debug", ["mutable debug"], _ => _.generator);
  main.variable(observer()).define(["mutable debug"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("randomPolygon")).define("randomPolygon", ["randomAngleSteps","d3"], _randomPolygon);
  main.variable(observer()).define(["cell"], _38);
  main.variable(observer("randomAngleSteps")).define("randomAngleSteps", ["d3"], _randomAngleSteps);
  main.variable(observer()).define(["cell"], _40);
  main.variable(observer("coverSquarePolygons")).define("coverSquarePolygons", ["randomPolygon","polygonArea"], _coverSquarePolygons);
  main.variable(observer()).define(["cell"], _42);
  main.variable(observer("polygonArea")).define("polygonArea", _polygonArea);
  main.variable(observer()).define(["cell"], _44);
  main.variable(observer("bounds")).define("bounds", _bounds);
  main.variable(observer()).define(["cell"], _46);
  return main;
}
