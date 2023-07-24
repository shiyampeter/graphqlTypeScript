import { InputType, Field } from 'type-graphql'
import { Length } from 'class-validator'
import { Category } from '../../entities/category'

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field()
  name: string

  @Field()
  @Length(1, 255)
  description: String
}
