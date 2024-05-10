import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { customTheme } from '../../../../constants/themeConstants';

const PatientRole = ({ route }) => {
  const [isLoading, setIsLoading] = useState(route.params?.isLoading || false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 3000); 
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={customTheme.colors.primary} /> 
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-base text-black">Content</Text>
    </View>
  );
};

export default PatientRole;
