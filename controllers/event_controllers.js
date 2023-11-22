const events = require('express').Router()
const db = require('../models')
const { Event, MeetGreet, SetTime, Stage_Event } = db


events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            include:[
                {
                    model: MeetGreet,
                    as: 'meet_greets',
                },
                {
                    model: SetTime,
                    as: 'set_times'
                },
                {
                    model: Stage_Event,
                    as: 'stage_events'
                }
    
                ]
        })
        console.log(foundEvents)
        res.status(200).json(foundEvents)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// GET BY ONE

events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne()
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// create a event

events.post('/', async (req, res) => {
    try {
        const createdEvent = Event.create(req.body)
        res.status(200).json({
            message: 'Good Job',
            data: createdEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

events.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }

        })
        res.status(200).json({
            message: `sussfuly updated ${updatedEvent} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

events.delete('/:id', async (req, res) => {
    try {
        const deleteEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        });
        res.status(200).json({
            message: `Successfully delete ${deleteEvent} event.`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports = events