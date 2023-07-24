import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql'
import { Product, ProductModel } from '../entities/product'
import { ProductInput } from './types/product'
import { Category, CategoryModel } from '../entities/category'

@Resolver(_of => Product)
export class ProductResolver {
  @Query(_returns => Product, { nullable: false })
  async returnSingleProduct (@Arg('id') id: string): Promise<any> {
    return await ProductModel.findById({ _id: id })
  };

  @Query(() => [Product])
  async returnAllProduct (): Promise<Product[]> {
    return await ProductModel.find()
  };

  @Mutation(() => Product)
  async createProduct (@Arg('data') data: ProductInput): Promise<Product> {
    try{
      const product = await ProductModel.create(data)
      await product.save()
      return product
    }catch(error){
      return error
    }
   
    
  };

  @Mutation(() => Boolean)
  async deleteProduct (@Arg('id') id: string): Promise<any> {
    await ProductModel.deleteOne({ id })
    return true
  }

  @FieldResolver(_type => (Category))
  async category (@Root() product: Product): Promise<Category> {
    const category: any = await CategoryModel.findById(product._doc.category_id)
    return category
  }
}
