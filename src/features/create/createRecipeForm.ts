import { generateId } from '@/composables/identifier';
import { useRecipes } from '@/composables/recipes';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export const useCreateRecipe = () => {
  const { add } = useRecipes();

  const schema = yup.object({
    name: yup.string().required().label('Name'),
    ingredients: yup.array<string[]>().required().label('Ingredients'),
    steps: yup.array<string[]>().required().label('Steps')
  });

  type CreateRecipeForm = yup.InferType<typeof schema>;

  const form = useForm<CreateRecipeForm>({
    validationSchema: schema,
    validateOnMount: false,
    initialValues: {
      ingredients: [],
      steps: ['', '', '', '']
    }
  });

  const create = async (values: CreateRecipeForm) => {
    add({
      id: generateId(),
      name: values.name,
      ingredients: values.ingredients.filter(x => !!x),
      steps: values.steps.filter(x => !!x)
    });
  };

  return { create, form };
};
