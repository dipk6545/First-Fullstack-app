const express = require('express')
const router = express.Router();

router.get('/', (req,res)=>{
    obj={
        Note: 'Subhadip',
        NN: '58589'
    }
    res.json(obj);
})

module.exports = router