import { useIngredient, useRecentSearch } from "@/state/searchState";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, ToastAndroid, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const Page = () => {
  const bounceValue = useSharedValue(0);

  const { ingredient, addIngredient, fetchData } = useIngredient();
  const { recentSearches, addRecentSearch } = useRecentSearch();

  React.useEffect(() => {
    bounceValue.value = withSpring(1, {
      damping: 2,
      stiffness: 80,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: bounceValue.value,
        },
      ],
    };
  });

  const copyToClipboard = async ({ index }: { index: string }) => {
    await Clipboard.setStringAsync(recentSearches[Number(index)]);
    ToastAndroid.show("Ingredient copied successfully", ToastAndroid.SHORT);
  };

  return (
    <View className="flex-1 bg-orange-50 ">
      <View className="flex-1 bg-orange-50 items-center p-6 top-1/4">
        <Animated.Text
          className="text-6xl font-extrabold mb-6 text-orange-800 text-center tracking-tight shadow-sm top-0 mt-12"
          style={animatedStyle}
        >
          Welcome
        </Animated.Text>
        <View className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-orange-500 w-full max-w-md">
          <Text className="text-2xl font-bold mb-4 text-orange-800 text-center">
            Add Ingredients
          </Text>
          <Text className="text-base color-black  bottom-2 font-normal">
            make sure you use (,) to seperate Ingredients
          </Text>
          <TextInput
            className="w-full bg-orange-100 rounded-lg p-4 text-orange-700 border-2 border-orange-300"
            placeholder="Enter ingredients (e.g., onion, garlic, tomatoes)"
            placeholderTextColor="#FB923C"
            cursorColor={"#9a3412"}
            onChangeText={(text) => {
              addIngredient(text);
            }}
            value={ingredient}
          />
        </View>

        <View className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 w-full max-w-md">
          <Text className="text-2xl font-bold mb-4 text-green-800 text-center">
            Recent Searches
          </Text>
          <View className="flex-row flex-wrap justify-center gap-3">
            {recentSearches.map((e, i) => (
              <Pressable
                android_ripple={{ color: "##a6f7ed" }} // Adjusted radius for a better fit
                onPress={() => copyToClipboard({ index: i.toString() })}
                key={`${i}`}
                className={
                  i % 2 === 0
                    ? "bg-green-100 px-4 py-2 rounded-full"
                    : "bg-orange-100 px-4 py-2 rounded-full"
                }
              >
                <Text
                  className={
                    i % 2 === 0 ? "text-green-800 font-semibold" : "text-orange-800 font-semibold"
                  }
                >
                  {e}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          className="bg-orange-500 rounded-lg p-4 mt-6 w-full max-w-md shadow-lg active:bg-orange-600"
          onPress={() => {
            addRecentSearch(ingredient);
            fetchData(ingredient);
            router.push("/ingredion");
          }}
        >
          <Text className="text-white text-center font-bold text-lg">Find Recipes</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Page;
