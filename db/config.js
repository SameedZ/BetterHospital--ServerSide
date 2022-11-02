const mongoose = require('mongoose');

mongoose.connect(
'mongodb atlas key here.',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{console.warn("Connected established@BetterHospital");
})
