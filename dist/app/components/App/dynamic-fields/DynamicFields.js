"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var polaris_1 = require("@shopify/polaris");
var PillGroup_1 = require("app/components/pill/group/PillGroup");
var DynamicFields = function (_a) {
    var optionSets = _a.optionSets;
    return ((0, jsx_runtime_1.jsx)("div", { children: optionSets.map(function (optionSet) { return ((0, jsx_runtime_1.jsxs)("div", { className: "option-set", children: [(0, jsx_runtime_1.jsx)("h3", { children: optionSet.name }), optionSet.options.map(function (option) {
                    var _a;
                    switch (option.type) {
                        case "text":
                            return ((0, jsx_runtime_1.jsx)(polaris_1.TextField, { label: option.label, autoComplete: "off" }, option.id));
                        case "email":
                            return ((0, jsx_runtime_1.jsx)(polaris_1.TextField, { label: option.label, autoComplete: "off", type: "email" }, option.id));
                        case "radio":
                            return ((0, jsx_runtime_1.jsx)(PillGroup_1.PillGroup, { options: option.values.map(function (value) { return ({
                                    label: value.title,
                                    value: value.title,
                                }); }), label: option.label, name: option.label, value: ((_a = option.values.find(function (v) { return v.defaultValue; })) === null || _a === void 0 ? void 0 : _a.title) || "" }, option.id));
                        // Ajoutez d'autres types de champs selon vos besoins
                        default:
                            return null;
                    }
                })] }, optionSet.id)); }) }));
};
exports.default = DynamicFields;
