import { Recipe, useRecipes } from '@/composables/recipes';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export const useEditRecipeForm = () => {
  const { replace, remove: removeRecipe } = useRecipes();

  const schema = yup.object({
    id: yup.string().required(),
    name: yup.string().required().label('Name'),
    steps: yup.array<string[]>().required().label('Steps')
  });

  type UpdateRecipeForm = yup.InferType<typeof schema>;

  const form = useForm<UpdateRecipeForm>({
    validationSchema: schema,
    validateOnMount: false,
    initialValues: {
      steps: ['', '', '', '']
    }
  });

  const initialise = (recipe: Recipe) => {
    form.setValues({
      id: recipe.id,
      name: recipe.name,
      steps: [...recipe.steps]
    });
  };

  const update = async (values: UpdateRecipeForm) => {
    await replace({
      id: values.id,
      name: values.name,
      steps: [...values.steps]
    });
  };

  const remove = async () => {
    await removeRecipe(form.values.id);
  };

  return { update, form, initialise, remove };
};
