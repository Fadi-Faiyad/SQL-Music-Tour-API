const stages = require('express').Router()
const { json } = require('sequelize')
const db = require('../models')
const { Stage, SetTime } = db


stages.get('/', async (req, res) => {
    try{
        const foundStages = await Stage.findAll({
            include: [
                {
                    model: SetTime,
                    as: 'set_times'
                }
            ]
        })
        res.status(200).json(foundStages)
    }catch(error){
        console.log(error)
        res.status(500),json(error)
    }
})

stages.get('/:id', async (req, res) => {
    try{
        const foundStage = await Stage.findOne();
        res.status(200).json(foundStage)
    }catch(error){
        res.status(500).json(error)
    }
})

stages.post('/', async (req, res) => {
    try{
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: 'lets gooooo',
            data: newStage
        })
    }catch(error) {
        res.status(500).json(error)
    }
})

stages.put('/:id', async (req, res) => {
    try{
        const stageUpdated = await Stage.update(req.body, {
            stage_id: req.params.id
        })
        res.status(200).json({
            message: `sussfuley updated ${stageUpdated} stage(s)`
        })
    }catch(error) {
        res.status(500).json(error)
    }
})

stages.delete('/:id', async (req, res) => {
    try {
        const deleteStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        });
        res.status(200).json({
            message: `successfully deleted ${deleteStage} stage.`
        })
    } catch(error) {
        res.status(500).json(error)
    }
})


module.exports = stages