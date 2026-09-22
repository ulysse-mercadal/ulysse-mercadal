import _ from 'lodash';
import paper from 'paper';
import { convertBgMode } from '../../utils';
import { scaleLinear, easeQuadIn } from 'd3';

const GROUP_COUNT = 30;

const vectorScale = scaleLinear().domain([0, GROUP_COUNT]).clamp(true).range([0.0, 0.6]);

export const sizeWaterfall = {
  attach: (_this, backgroundMode) => {
    _this.sizeWaterfall = {
      point: new paper.Point(400, 200),
      tPoint: new paper.Point(400, 200)
    };
    _this.project.activate();
    _this.sizeWaterfall.glyphs = [];
    _.each(_this.glyphs, (glyph) => {
      var _g = glyph.clone();
      _this.sizeWaterfall.glyphs.push(_g);
      glyph.visible = false;
    });
    _this.sizeWaterfall.originalGlyphGroup = new paper.Group(_this.sizeWaterfall.glyphs);
    _this.sizeWaterfall.originalGlyphGroup.fillColor = convertBgMode(backgroundMode, "f");
    _this.sizeWaterfall.originalGlyphGroup.strokeColor = convertBgMode(backgroundMode, "b");
    _this.sizeWaterfall.glyphGroups = [];
    var s = scaleLinear().domain([0, GROUP_COUNT]).clamp(true).range([1.0, 0.8]);
    for (let i = 0; i < GROUP_COUNT; i++) {
      let glyphGroup = _this.sizeWaterfall.originalGlyphGroup.clone();
      glyphGroup.scale(easeQuadIn(s(i)));
      if (i == 0) {
        if (backgroundMode == "white") {
          glyphGroup.fillColor = convertBgMode(backgroundMode, "f");
          glyphGroup.strokeColor = convertBgMode(backgroundMode, "b");
        } else {
          glyphGroup.fillColor = convertBgMode(backgroundMode, "b");
          glyphGroup.strokeColor = convertBgMode(backgroundMode, "f");
        }
      } else {
        if (backgroundMode == "white") {
          glyphGroup.fillColor = convertBgMode(backgroundMode, "f");
          glyphGroup.strokeColor = convertBgMode(backgroundMode, "b");
        } else {
          glyphGroup.fillColor = convertBgMode(backgroundMode, "b");
          glyphGroup.strokeColor = convertBgMode(backgroundMode, "f");
        }
      }
      _this.sizeWaterfall.glyphGroups.push(glyphGroup);
    }
    _this.view.onMouseMove = (e) => {
      _this.sizeWaterfall.tPoint = e.point.clone();
    }
    var handleScale = scaleLinear().domain([0, _this.sizeWaterfall.originalGlyphGroup.bounds.center.x, _this.screenWidth]).clamp(true).range([500, 0, -500]);
    _this.view.onFrame = () => {
      _this.sizeWaterfall.point = _this.sizeWaterfall.point.add(_this.sizeWaterfall.tPoint.subtract(_this.sizeWaterfall.point).multiply(0.2));
      var path = new paper.Path();
      var center = _this.sizeWaterfall.originalGlyphGroup.bounds.center;
      path.visible = false;
      path.add(center);
      var handleIn = new paper.Point(handleScale(_this.sizeWaterfall.point.x), 0);
      var handleOut = new paper.Point(0, 0);
      path.add(new paper.Segment(_this.sizeWaterfall.point, handleIn, handleOut));
      _this.sizeWaterfall.point.subtract(center);
      _.each(_this.sizeWaterfall.glyphGroups, (g, i) => {
        g.position = path.getPointAt(vectorScale(i) * path.length);
      });
      path.remove();
    };
  },

  changeBgMode: (_this, backgroundMode) => {
    _this.project.activate();
    _this.sizeWaterfall.originalGlyphGroup.fillColor = convertBgMode(backgroundMode, "f");
    _this.sizeWaterfall.originalGlyphGroup.strokeColor = convertBgMode(backgroundMode, "b");
    _.each(_this.sizeWaterfall.glyphGroups, (glyphGroup, i) => {
      if (i == 0) {
        if (backgroundMode == "white") {
          glyphGroup.fillColor = convertBgMode(backgroundMode, "f");
          glyphGroup.strokeColor = convertBgMode(backgroundMode, "b");
        } else {
          glyphGroup.fillColor = convertBgMode(backgroundMode, "b");
          glyphGroup.strokeColor = convertBgMode(backgroundMode, "f");
        }
      } else {
        if (backgroundMode == "white") {
          glyphGroup.fillColor = convertBgMode(backgroundMode, "f");
          glyphGroup.strokeColor = convertBgMode(backgroundMode, "b");
        } else {
          glyphGroup.fillColor = convertBgMode(backgroundMode, "b");
          glyphGroup.strokeColor = convertBgMode(backgroundMode, "f");
        }
      }
    });
    _this.view.draw();
  },

  detach: (_this) => {
    _this.project.activate();
    _.each(_this.glyphs, (glyph) => {
      glyph.visible = true;
    });
    _.each(_this.sizeWaterfall.glyphGroups, g => {
      g.remove();
    });
    _this.sizeWaterfall.originalGlyphGroup.remove();
    _this.view.onFrame = null;
    _this.view.onMouseMove = null;
    _this.view.draw();
  }
};