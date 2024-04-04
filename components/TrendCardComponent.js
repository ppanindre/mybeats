import React, { useState } from "react";
import { View, Text, ActivityIndicator, Touchable } from "react-native";
import { Card, Divider, Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TrashIcon } from "react-native-heroicons/outline";

const CARD_VALUE_SIZE = 12;
const ARROW_SIZE = 13;

/**
 * The card component for showing various trend values.
 * @param data The data is an array of objects such as
 * [{title : "Recent" , value : "100" , arrow : "arrowUp" , color : "red"}]
 * @param title The title of the card
 * @param lastSyncDate Date when the last sync happened for the data
 * @param cardBarColor The color of the bar under the title.
 */

const TrendCardComponent = ({
  title = "",
  subtitle = false,
  showArrows = true,
  data = {},
  cardColor = "#ffffff",
  showEdit = false,
  isFoodTrendCard = false,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [currentDay, setCurrentDay] = useState(false);

  return (
    <Card
      className="px-5, py-4 mt-5 bg-white mb-5 border-2 border-orange-400 shadow-none"
      onPress={onEdit}
    >
      <Card.Title
        right={() =>
          data == {} || !data ? (
            <ActivityIndicator color="#fb923c" />
          ) : (
            <TouchableOpacity
              style={{
                display: isFoodTrendCard ? "flex" : "none",
                marginTop: -15,
                marginRight: 10,
                //borderColor: "green", borderWidth: 1, borderRadius: 15,
                padding: 10,
                elevation: 0,
                backgroundColor: cardColor,
              }}
            >
              {showEdit ? (
                <Entypo
                  name="edit"
                  size={20}
                  color="#fb923c"
                  onPress={onEdit}
                />
              ) : (
                <TouchableOpacity onPress={onDelete}>
                  <TrashIcon color="#fb923c" size={20} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          )
        }
        subtitleStyle={{ fontWeight: "bold", color: "black" }}
        titleStyle={{ fontWeight: "bold", color: "#4a4a4a" }}
        title={title}
        subtitle={subtitle ? subtitle : ""}
      />

      <Divider
        style={{
          borderWidth: 2,
          marginStart: 15,
          marginEnd: 15,
          borderColor: data[3]?.trendCardBarColor ?? "#D4d4d4",
        }}
      />
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Title
              style={{
                color: "rgba(67, 67, 67, 0.5)",
                fontSize: CARD_VALUE_SIZE,
                lineHeight: 19,
                width: 85,
                fontWeight: "bold",
              }}
            >
              {data[0]?.value ?? ""}
            </Title>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "rgba(67, 67, 67, 0.5)",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {data[0]?.title ?? ""}
              </Text>
              {data[0]?.value != "-" && showArrows && !currentDay && (
                <AntDesign
                  name={data[0]?.arrow ?? "caretup"}
                  size={ARROW_SIZE}
                  color={data[0]?.color ?? "#fb923d"}
                  style={{ alignSelf: "center", marginTop: 3 }}
                />
              )}
            </View>
          </View>
          <View
            style={{
              borderRightColor: "rgba(67, 67, 67, 0.3)",
              borderRightWidth: 2,
              marginTop: 10,
              marginBottom: 2,
            }}
          />
          <View style={{ flexDirection: "column" }}>
            <Title
              style={{
                color: "rgba(67, 67, 67, 0.5)",
                fontSize: CARD_VALUE_SIZE,
                lineHeight: 19,
                width: 85,
                fontWeight: "bold",
              }}
            >
              {data[1]?.value ?? ""}
            </Title>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "rgba(67, 67, 67, 0.5)",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {data[1]?.title ?? ""}
              </Text>
              {data[1]?.value != "-" && showArrows && !currentDay && (
                <AntDesign
                  name={data[1]?.arrow ?? "caretup"}
                  size={ARROW_SIZE}
                  color={data[1]?.color ?? "#fb923d"}
                  style={{ alignSelf: "center", marginTop: 3 }}
                />
              )}
            </View>
          </View>
          <View
            style={{
              borderRightColor: "rgba(67, 67, 67, 0.3)",
              borderRightWidth: 2,
              marginTop: 10,
              marginBottom: 2,
            }}
          />
          <View style={{ flexDirection: "column" }}>
            <Title
              style={{
                color: "rgba(67, 67, 67, 0.5)",
                fontSize: CARD_VALUE_SIZE,
                lineHeight: 19,
                width: 85,
                fontWeight: "bold",
              }}
            >
              {data[2]?.value ?? ""}
            </Title>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "rgba(67, 67, 67, 0.5)",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {data[2]?.title ?? ""}
              </Text>
              {data[2]?.value != "-" && showArrows && !currentDay && (
                <AntDesign
                  name={data[2]?.arrow ?? "caretup"}
                  size={ARROW_SIZE}
                  color={data[2]?.color ?? "#fb923d"}
                  style={{ alignSelf: "center", marginTop: 3 }}
                />
              )}
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default TrendCardComponent;
