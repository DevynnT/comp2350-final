const database = require('./databaseConnection');

const getAllItems = async () => {
    const sqlQuery = `
        SELECT purchase_item_id, item_name, item_description, cost, quantity
        FROM purchase_item;
    `;

    try {
        const allItems = await database.query(sqlQuery);
        return allItems[0];
    } catch (error) {
        console.log("error selecting from table");
        console.log(error);
        return null;
    }
};

const addItem = async (data) => {
    if (parseFloat(data.cost) === NaN || parseInt(data.quantity) === NaN) {
        return false;
    }

    const sqlInsertQuery = `
        INSERT INTO purchase_item (item_name, item_description, cost, quantity)
        VALUES (:item_name, :item_description, :cost, :quantity);
    `;
    const params = {
        item_name: data.item_name,
        item_description: data.description,
        cost: parseFloat(data.cost),
        quantity: parseFloat(data.quantity),
    };

    try {
        await database.query(sqlInsertQuery, params);
        return true;
    } catch (error) {
        console.log("error inserting into table");
        console.log(error);
        return false;
    }
};

const deleteItem = async (itemId) => {
    const sqlQuery = `
        DELETE FROM purchase_item
        WHERE purchase_item_id = :itemId;
    `;
    const params = { itemId };

    try {
        await database.query(sqlQuery, params);
        return true;
    } catch (error) {
        console.log("Error while attempting to delete item");
        console.log(error);
        return false;
    }
};

const changeQuantity = async (itemId, operation) => {
    let getQuantityQuery = `
        SELECT quantity
        FROM purchase_item
        WHERE purchase_item_id = :itemId;
    `;
    const params = { itemId };
    let quantity;

    try {
        const data = await database.query(getQuantityQuery, params);
        quantity = data[0][0].quantity;
    } catch (error) {
        console.log(error);
    }

    if (quantity == null || quantity == undefined) {
        return false;
    }

    if (quantity === 1 && operation === "remove") {
        deleteItem(itemId);
        return true;
    }
    
    const sqlQuery = `
        UPDATE purchase_item
        SET quantity = :quantity
        WHERE purchase_item_id = :itemId;
    `;
    let params2 = {
        itemId
    };

    if (operation.toLowerCase() === "add") {
        params2.quantity = quantity + 1;
    } else {
        params2.quantity = quantity - 1;
    }

    try {
        await database.query(sqlQuery, params2);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = { getAllItems, addItem, deleteItem, changeQuantity };