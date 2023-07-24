import { ObjectType, Field, ID, Int } from 'type-graphql'
import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { Ref } from '../types'
import { Category } from './category'

@ObjectType({ description: 'The Product model' })
export class Product {
  @Field(() => ID)
  id: String

  @Field()
  @Property()
  name: String

  @Field()
  @Property()
  description: String

  @Field()
  @Property()
  color: String

  @Field(_type => Int)
  @Property()
  stock: number

  @Field(_type => Int)
  @Property()
  price: number

  @Field(_type => String)
  @Property({ ref: Category })
  categoryId: Ref<Category>

  _doc: any
}

export const ProductModel = getModelForClass(Product)
