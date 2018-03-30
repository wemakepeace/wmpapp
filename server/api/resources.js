const app = require('express').Router();
const AgeGroup = require('../db/models/AgeGroup');
const ageGroupData = require('../constants/ageGroups');
const { extractDataForFrontend } = require('../utils/helpers');

/** fetch agegroups and format for FE **/
app.get('/agegroups', (req, res, next) => {
    return AgeGroup.findAll()
        .then(age_groups => {
            const data = age_groups.map(group => {
                return {
                    label: group.dataValues.label,
                    value: group.dataValues.id
                }
            })
            res.send(data);
        });
});

module.exports = app;



