import { supabase } from "./supabase"

async function findByIds(ids: string[]) {
  const { data } = await supabase
    .from("ingredientes")
    .select()
    .in("id", ids)
    .order("name")
    .returns<IngredientResponse[]>()

  return data ?? []
}

async function findByRecipeId(id: string) {
  const { data } = await supabase
    .from("recipes_ingredients")
    .select("ingredientes (id, name, image)")
    .eq("recipe_id", id)
    .returns<{ ingredients: IngredientResponse }[]>()

  return data ? data.map((item) => item.ingredients) : []
}


async function findAll() {
  const { data } = await supabase
    .from("ingredientes")
    .select()
    .order("name")
    .returns<IngredientResponse[]>()

  return data ?? []
}

export { findAll, findByIds, findByRecipeId }
