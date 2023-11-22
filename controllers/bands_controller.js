// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event, SetTime } = db
// CONTROLLERS 


bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            include:[
                {
                    model: MeetGreet,
                    as: 'meet_greets',
                    include: {model: 
                        Event, 
                        as:'event',
                        
                }
                },
                {
                    model: SetTime,
                    as: 'set_times',
                    include: {model: 
                        Event, 
                        as:'event',
                       
                    }
                }
                 
                ]
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})
// GET ONE BAND
bands.get('/:name', async (req, res) => {
    try {
        
        const foundBand = await Band.findOne({
            where: { name: req.params.name }
        });
        console.log("hell___Yea",foundBand)
        res.status(200).json(foundBand);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// CREATE BAND
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body);
        res.status(200).json({
            message: 'Sussscufily incred a new band',
            data: newBand
        })
    } catch (error) {
        res.status(500).json(error);
    }
})
// UPDATE BAND

bands.put('/:id', async (req, res) => {
    try {
        const bandUpdate = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `sussclfy updated ${bandUpdate} band(s)`
        })

    } catch (error) {
        res.status(500).json(error);
    }
})

bands.delete('/:id', async (req, res) => {
    try {
        const deleteBand = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        });
        res.status(200).json({
            message: `Successfully deleted ${deleteBand} band.`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// EXPORT
module.exports = bands



