import express from 'express'
import dotenv from "dotenv"
import morgan from 'morgan'
import { dbConnection } from './databases/dbConnection.js';
import categoryRouter from './src/modules/category/category.router.js';
import { AppError } from './src/utils/AppError.js';
import { globalErrorMiddleware } from './src/middleware/globalErrorMiddleware.js';
import subCategoryRouter from './src/modules/subCategory/subCategory.router.js';
import brandRouter from './src/modules/brand/brand.router.js';
import productRouter from './src/modules/product/product.router.js';

dotenv.config()
const app = express()
const port = 3000

app.use(express.json())
if (process.env.MODE == 'development'){
    app.use(morgan('dev'))
}

app.use(express.static('uploads'))

app.use('/api/v1/categories' , categoryRouter)
app.use('/api/v1/subcategories' , subCategoryRouter)
app.use('/api/v1/brands' , brandRouter)
app.use('/api/v1/products' , productRouter)



app.get('/', (req, res) => res.send('Hello World!'))


app.all('*' , (req , res , next) => {
    next( new AppError(`can not find this route : ${req.originalUrl}` , 404) )
})

app.use(globalErrorMiddleware)
dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

process.on( 'unhandledRejection' , ( err ) =>{
    console.log('unhandledRejection' , err);
} )


