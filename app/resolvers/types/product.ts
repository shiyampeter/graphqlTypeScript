import { InputType, Field } from 'type-graphql'
import { Length } from 'class-validator'
import { Product } from '../../entities/product'
import { ObjectId } from 'mongodb'
import { Category } from '../../entities/category'

@InputType()
export class ProductInput implements Partial<Product> {
  @Field()
  name: String

  @Field()
  @Length(1, 255)
  description: String

  @Field()
  color: String

  @Field()
  stock: number

  @Field()
  price: number

  @Field(() => String)
  categoryId: ObjectId
}



export class ProductOutput  {
  @Field()
  name: String

  @Field()
  @Length(1, 255)
  description: String

  @Field()
  color: String

  @Field()
  stock: number

  @Field()
  price: number

  @Field() 
  category: Category
}

