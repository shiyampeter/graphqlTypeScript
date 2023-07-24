import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { Category, CategoryModel } from '../entities/category'
import { CategoryInput } from './types/category'

@Resolver()
export class CategoryResolver {
  @Query(_returns => Category, { nullable: false })
  async returnSingleCategory (@Arg('id') id: string): Promise<any> {
    return await CategoryModel.findById({ _id: id })
  };

  @Query(() => [Category])
  async returnAllCategory (): Promise<Category[]> {
    return await CategoryModel.find()
  };

  @Mutation(() => Category)
  async createCategory (@Arg('data') data: CategoryInput): Promise<Category> {
    const category = await CategoryModel.create(data)
    await category.save()
    return category
  };

  @Mutation(() => Boolean)
  async deleteCategory (@Arg('id') id: string): Promise<any> {
    // const data:any = await CategoryModel.findById({ _id: id })
    // data.delete();
    await CategoryModel.deleteOne({ _id:id })
    return true
  }
}
