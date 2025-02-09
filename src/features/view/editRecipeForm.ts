import { Recipe, useRecipes } from '@/composables/recipes';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export const useEditRecipeForm = () => {
  const { replace, remove: removeRecipe } = useRecipes();

  const schema = yup.object({
    id: yup.string().required(),
    name: yup.string().required().label('Name'),
    ingredients: yup.array<string[]>().required().label('Ingredients'),
    steps: yup.array<string[]>().required().label('Steps')
  });

  type UpdateRecipeForm = yup.InferType<typeof schema>;

  const form = useForm<UpdateRecipeForm>({
    validationSchema: schema,
    validateOnMount: false
  });

  const initialise = (recipe: Recipe) => {
    form.setValues({
      id: recipe.id,
      name: recipe.name,
      ingredients: [...recipe.ingredients],
      steps: [...recipe.steps]
    });
  };

  const update = async (values: UpdateRecipeForm) => {
    await replace({
      id: values.id,
      name: values.name,
      ingredients: values.ingredients.filter(x => !!x),
      steps: values.steps.filter(x => !!x)
    });
  };

  const remove = async () => {
    await removeRecipe(form.values.id);
  };

  return { update, form, initialise, remove };
};
