"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exponentiate_operation_1 = require("./exponentiate.operation");
describe('Exponentiate Operation Tests', function () {
    var converter;
    beforeEach(function () {
        converter = new exponentiate_operation_1.ExponentiateOperation();
    });
    it('options should return true for no more', function () {
        expect(converter.getOptions().noMore()).toBeFalsy();
    });
    it('opthons should return a list of one', function () {
        expect(converter.getOptions().options().length).toBe(1);
    });
    it('inputs should return one inputs', function () {
        expect(converter.getInputs().inputs().length).toBe(1);
    });
    it('submitting a list of numbers and power should exponentiate', function () {
        converter.getInputs().submit({
            'features': {
                features: ['f1'],
                examples: [[1], [2]]
            }
        });
        converter.getOptions().submit({
            'number': 2
        });
        expect(converter.getOptions().noMore).toBeTruthy();
        var data = converter.transform();
        expect(data).toEqual({
            features: ['f1'],
            examples: [[1], [4]]
        });
    });
    it('submitting three list of numbers and power should exponentiate', function () {
        converter.getInputs().submit({
            'features': {
                features: ['f1', 'f2', 'f3'],
                examples: [[1, 2, 3], [4, 5, 6]]
            }
        });
        converter.getOptions().submit({
            'number': 2
        });
        expect(converter.getOptions().noMore).toBeTruthy();
        var data = converter.transform();
        expect(data).toEqual({
            features: ['f1', 'f2', 'f3'],
            examples: [[1, 4, 9], [16, 25, 36]]
        });
    });
});
