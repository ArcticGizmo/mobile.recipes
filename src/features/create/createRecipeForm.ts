import { generateId } from '@/composables/identifier';
import { useRecipes } from '@/composables/recipeStore';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export const useCreateRecipe = () => {
  const { add } = useRecipes();

  const schema = yup.object({
    name: yup.string().required().label('Name'),
    steps: yup.array<string[]>().required().label('Steps')
  });

  type CreateRecipeForm = yup.InferType<typeof schema>;

  const form = useForm<CreateRecipeForm>({
    validationSchema: schema,
    validateOnMount: false,
    initialValues: {
      steps: ['', '', '', '']
    }
  });

  const create = async (values: CreateRecipeForm) => {
    add({
      id: generateId(),
      name: values.name,
      steps: values.steps
    });
  };

  return { create, form };
};
