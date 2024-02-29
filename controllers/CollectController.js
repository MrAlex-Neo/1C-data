import CollectModel from '../models/Collection.js'


export const create =  async (req, res) => {
    try {
        const doc = new CollectModel({
            title: req.body.title,
            data: req.body.data,
        })

        const collect = await doc.save();

        res.json(collect)
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать коллекцию",
        })
    }
};

export const remove = async (req, res) => {
    try {
        const collectId = req.params.id;
        if (!collectId) {
            return res.status(404).json({
                message: "Нет удалось найти коллекцию",
            });
        }
        const removeCollect = await CollectModel.findByIdAndDelete({
            _id: collectId
        }).exec();
        console.log(removeCollect)

        if (!removeCollect) {
            return res.status(404).json({
                message: "не удалось найти коллекцию",
            });
        }
        
        res.json({
            message: "Коллекция успешно удалена",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить коллекцию",
        });
    }
};


export const update = async(req, res) => {
    try {
        const collectId = req.params.id;
        await CollectModel.findOneAndUpdate(
            {
                _id: collectId
            }, 
            {
                title: req.body.title,
                data: req.body.data,
            }, 
            {
                returnDocument: 'after'
            }
        );
        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось обновить коллекцию",
        })
    }
};
