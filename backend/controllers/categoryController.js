
import categoryModel from "../models/categoryModel.js"
import slugify from 'slugify'
export const categoryConteoller = async (req, res) => {
    try {

        const { name } = req.body

        if (!name) {
            return res.status(401).send({ message: 'Name is required' })
        }

        const existcategory = await categoryModel.findOne({ name })
        if (existcategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already Exists'
            })
        }


        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "New Category created",
            category,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error in categorycontroller"
        })
    }

}