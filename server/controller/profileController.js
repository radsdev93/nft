
const logger = require("../utils/logger")
const { getUserByAddress } = require('./userController')

const getOwned = async (req, res, next) => {
    try {
        const db = dbo.getDb();
        let query = { minter: req.params.userAdd }
        let result = await db.collection("nft_details").find(query).toArray();
        res.send(result).status(200);
    } catch (err) {
        logger.error(err);
        next({ status: 500, message: err.message })
    }
}

const getCollected = async (req, res, next) => {
    try {
        const db = dbo.getDb();
        let query = { owner: req.params.userAdd }
        let result = await db.collection("nft_details").find(query).toArray();
        res.send(result).status(200);
    } catch (err) {
        logger.error(err);
        next({ status: 500, message: err.message })
    }
}

const getRented = async (req, res, next) => {
    const db = dbo.getDb();
    let query = { token_type: "ERC4907", user: req.params.userAdd, expiry: { $ne: 0 } }
    try {
        let output = []
        let result = await db.collection("nft_details").find(query).toArray();
        if (result) {
            for (i in result) {
                let expires = parseInt(result[i].expiry._hex)
                let now = Date.now() / 1000
                if (expires > now) {
                    output.push(result[i])
                }
            }
        }
        // logger.info(JSON.stringify(output))
        res.send(output).status(200);
    } catch (err) {
        logger.error(err);
        next({ status: 500, message: err.message })
    }

}

const getListed = async (req, res, next) => {
    const db = dbo.getDb();
    let query = { owner: req.params.userAdd, $or: [{ sell_listed_status: true }, { rent_listed_status: true }, { inst_listed_status: true }] }
    try {
        let listed = await db.collection("nft_details").find(query).toArray();
        // console.log(listed)
        res.send(listed).status(200);
    } catch (err) {
        logger.error(err);
        next({ status: 500, message: err.message })
    }
}

const getCollections = async (req, res, next) => {
    try {
        const db = dbo.getDb();
        let collections = await db.collection("collections").find({ createdBy: req.params.userAdd }).toArray();

        for (let i in collections) {
            let user = await getUserByAddress(collections[i].createdBy)
            collections[i].createdUserName = user.name
            collections[i].createdUserImage = user.profileImage
            let tokensList = await db.collection("nft_details").find({ coll_addr: collections[i]._id }).toArray();

            if (tokensList.length > 0) {
                collections[i].count = tokensList.length
                let uriList = []
                for (token in tokensList) {
                    uriList.push(tokensList[token].uri)
                }
                if (uriList.length > 4) {
                    uriList = uriList.slice(0, 4)
                }
                if (collections[i] != undefined) {
                    collections[i].tokens = uriList
                }
            }
        }
        res.send(collections).status(200)
    } catch (err) {
        logger.error(err);
        next({ status: 500, message: err.message })
    }
}

const getLended = async (req, res, next) => {
    const db = dbo.getDb();
    let query = { token_type: "ERC4907", owner: req.params.userAdd, expiry: { $ne: 0 } }
    try {
        let output = []
        let result = await db.collection("nft_details").find(query).toArray();
        if (result) {
            for (i in result) {
                let expires = parseInt(result[i].expiry._hex)
                let now = Date.now() / 1000
                if (expires > now) {
                    output.push(result[i])
                }
            }
        }
        // logger.info(JSON.stringify(output))
        res.send(output).status(200);
    } catch (err) {
        logger.error(err);
        next({ status: 500, message: err.message })
    }
}

const getCollectionTokens = async (req, res, next) => {
    try {
        const db = dbo.getDb();
        let collection_data = await db.collection("collections").findOne({ _id: req.params.collectionAdd });
        let result = await db.collection("nft_details").find({ coll_addr: req.params.collectionAdd }).toArray();
        if (result) {
            for (i in result) {
                let user = await getUserByAddress(result[i].owner)
                if(user){
                    result[i].ownerUserName = user.name
                    result[i].ownerUserImage = user.profileImage 
                } else {
                    result[i].ownerUserName = "undefined"
                    result[i].ownerUserImage = "" 
                }
            }
        }
        let output = { collection: collection_data, tokens: result }
        res.send(output).status(200);
    } catch (err) {
        logger.error(err);
        // console.log(err)
        next({ status: 500, message: err.message })
    }
}
module.exports = {
    getOwned,
    getCollected,
    getRented,
    getCollections,
    getListed,
    getLended,
    getCollectionTokens
}
