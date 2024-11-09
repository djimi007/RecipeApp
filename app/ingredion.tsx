import { useIngredient } from "@/state/searchState";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const { data } = useIngredient();

  return (
    <View className="flex-1 bg-orange-50 p-4">
      <FlatList
        className="flex-1"
        data={data}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item: recipe }) => (
          <View className="bg-white rounded-lg shadow-lg p-4 mb-4 border-l-4 border-orange-500">
            <Text className="text-2xl font-bold text-orange-800 mb-4">{recipe.title}</Text>

            <View className="mb-4">
              <Text className="text-lg font-semibold text-orange-700 mb-2">Ingredients:</Text>
              {recipe.ingredients.split("|").map((ingredient, i) => (
                <Text key={`ingredient-${i}`} className="text-gray-700 ml-4">
                  • {ingredient.trim()}
                </Text>
              ))}
            </View>

            <View className="mb-4">
              <Text className="text-lg font-semibold text-orange-700">Servings:</Text>
              <Text className="text-gray-700 ml-4">{recipe.servings}</Text>
            </View>

            <View>
              <Text className="text-lg font-semibold text-orange-700 mb-2">Instructions:</Text>
              {recipe.instructions
                .split(".")
                .filter(Boolean)
                .map((instruction, i) => (
                  <Text key={`instruction-${i}`} className="text-gray-700 ml-4 mb-2">
                    {i + 1}. {instruction.trim()}
                  </Text>
                ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}
