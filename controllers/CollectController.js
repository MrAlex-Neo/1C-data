import CollectModel from '../models/Collection.js'



export const getAll = async (req, res) => {
    try {
        const posts = await CollectModel.find();
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить коллекции",
        })
    }
};

export const getOne = async (req, res) => {
    try {
        const collectId = req.params.id;
        const updatedForm = await CollectModel.findOneAndUpdate(
            {
                _id: collectId
            }, 
            {
                $inc: { viewsCount: 1 } // Инкрементируем счетчик просмотров
            }, 
            {
                new: true // Для возврата обновленного документа
            }
        );

        if (!updatedForm) {
            return res.status(404).json({
                message: "Коллекция не найдена",
            });
        }

        res.json(updatedForm);
 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить коллекцию",
        });
    }
};

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
