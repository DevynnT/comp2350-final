const router = require('express').Router();
const dbModel = require('../databaseAccess');

router.get('/', async (req, res) => {
    try {
        const allItems = await dbModel.getAllItems();
        let price = 0;

        for (const item of allItems) {
            if (parseFloat(item.cost) != NaN) {
                for (let index = 0; index < item.quantity; index++) {
                    price += parseFloat(item.cost);
                }
            }
        }

        res.render("index", { allItems, price });
    } catch (error) {
        console.log(error);
    }
});

router.post('/addItem', async (req, res) => {
    console.log("Submitting item");

    try {
        const success = await dbModel.addItem(req.body);
        if (!success) {
            console.log("Error writing to MySQL");
        }
        res.redirect("/");
    } catch (error) {
        console.log("Error writing to MySQL");
        console.log(error);
        res.redirect("/");
    }
});

router.get('/deleteItem', async (req, res) => {
    console.log("Deleting item");
    const itemId = req.query.id;

    if (itemId) {
        const success = await dbModel.deleteItem(itemId);
        if (!success) {
            console.log("error while attempting to delete item");
        }
    }
    
    res.redirect("/");
});

router.get('/addQuantity', async (req, res) => {
    console.log("Adding quantity");
    const itemId = req.query.id;

    if (itemId) {
        const success = await dbModel.changeQuantity(itemId, "add");
        if (!success) {
            console.log("error while attempting to add quantity");
        }
    }

    res.redirect("/");
});

router.get('/removeQuantity', async (req, res) => {
    console.log("Removing quantity");
    const itemId = req.query.id;

    if (itemId) {
        const success = await dbModel.changeQuantity(itemId, "remove");
        if (!success) {
            console.log("Error while attempting to remove quantity")
        }
    }

    res.redirect("/");
});

module.exports = router;