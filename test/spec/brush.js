define({
  "width": 200,
  "height": 200,
  // "padding": {"top": 10, "left": 30, "bottom": 30, "right": 10},

  "signals": [
    {
      "name": "brush_start",
      "init": {"x": 0, "y": 0},
      "streams": [{"type": "mousedown", "expr": "p"}]
    },
    {
      "name": "brush_end",
      "init": {"x": 0, "y": 0},
      "streams": [
        {"type": "mousedown", "expr": "p"},
        {"type": "[mousedown, mouseup] > mousemove", "expr": "p"}
      ]
    }
  ],

  "predicates": [
    {
      "name": "xRange",
      "type": "in",
      "item": {"arg": "x"},
      "range": [{"signal": "brush_start.x"}, {"signal": "brush_end.x"}],
      "scale": {"arg": "xScale"}
    },

    {
      "name": "yRange",
      "type": "in",
      "item": {"arg": "y"},
      "range": [{"signal": "brush_start.y"}, {"signal": "brush_end.y"}],
      "scale": {"arg": "yScale"}
    },

    {
      "name": "inRange",
      "type": "&&",
      "operands": [
        {"predicate": "xRange"},
        {"predicate": "yRange"}
      ]
    }
  ],

  "data": [{
    "name": "iris",
    "url": "data/iris.json"
  }],

  "scales": [
    {
      "name": "x",
      "range": "width", "zero": false,
      "domain": {"data": "iris", "field": "sepalWidth"}
    },
    {
      "name": "y",
      "range": "height",
      "nice": true, "zero": false,
      "domain": {"data": "iris", "field": "petalLength"}
    },
    {
      "name": "c",
      "type": "ordinal",
      "domain": {"data": "iris", "field": "species"},
      "range": ["#800", "#080", "#008"]
    }
  ],

  "axes": [
    {"type": "x", "scale": "x", "offset": 5, "ticks": 5, "title": "Sepal Width"},
    {"type": "y", "scale": "y", "offset": 5, "ticks": 5, "title": "Petal Length"}
  ],

  "marks": [
    {
      "type": "symbol",
      "from": {"data": "iris"},
      "properties": {
        "enter": {
          "x": {"scale": "x", "field": "sepalWidth"},
          "y": {"scale": "y", "field": "petalLength"},
          "fill": {"scale": "c", "field": "species"},
          "fillOpacity": {"value": 0.5},
          "size": {"value": 100}
        },
        "update": {
          "fill": {
            "rule": [
              {
                "predicate": "inRange",
                "input": {
                  "x": {"field": "sepalWidth"},
                  "y": {"field": "petalLength"},
                  "xScale": {"scale": "x", "invert": true},
                  "yScale": {"scale": "y", "invert": true}
                },

                "scale": "c", 
                "field": "species"
              },
              {"value": "grey"}
            ]
          }
        }
      }
    },

    {
      "type": "rect",
      "properties": {
        "update": {
          "x": {"signal": "brush_start.x"},
          "x2": {"signal": "brush_end.x"},
          "y": {"signal": "brush_start.y"},
          "y2": {"signal": "brush_end.y"},
          "fill": {"value": "grey"},
          "fillOpacity": {"value": 0.2}
        }
      }
    }
  ]
})