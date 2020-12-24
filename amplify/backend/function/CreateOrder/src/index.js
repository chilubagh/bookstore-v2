const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const ORDER_TABLE = "Order-274doapqr5f7rmuqbdfpgvfnwi-pro
";
const ORDER_TYPE = "Order";
const BOOK_ORDER_TABLE = "BookOrder-274doapqr5f7rmuqbdfpgvfnwi-pro";
const BOOK_ORDER_TYPE = "BookOrder";

const createOrder = async(payload) => {
    const { order_id, username, email, total } = payload;
    var params = {
        TableName: ORDER_TABLE,
        Item: {
            id: order_id,
            __typename: ORDER_TYPE,
            customer: email,
            user: username,
            total: total,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }
    };
    console.log(params);
    await documentClient.put(params).promise();
};

const createBookOrder = async(payload) => {
    let bookOrders = [];
    for (i = 0; i < payload.cart.length; i++) {
        const cartItem = payload.cart[i];
        bookOrders.push({
            PutRequest: {
                Item: {
                    id: uuidv4(),
                    __typename: BOOK_ORDER_TYPE,
                    book_id: cartItem.id,
                    order_id: payload.order_id,
                    customer: payload.email,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            }
        });
    }
    let params = {
        RequestItems: {}
    };
    params["RequestItems"][BOOK_ORDER_TABLE] = bookOrders;
    console.log(params);
    await documentClient.batchWrite(params).promise();
};