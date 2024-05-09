import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  FireIcon,
  HeartIcon,
} from "react-native-heroicons/outline";

import {
  FireIcon as FireIconSolid,
  BellIcon as BellIconSolid,
  HeartIcon as HeartIconSolid,
  ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterIconSolid,
} from "react-native-heroicons/solid";
import { customTheme } from "./themeConstants";
import Chat from "../screens/Chat";
import Notifications from "../screens/Notifications";
import MybeatsStack from "../src/app/configs/MybeatsConfig/MybeatsStack";
import FirebeatsDashboardStack from "../src/app/configs/FirebeatsConfig/FirebeatsDashboardStack";

// Unfocused icon size of the bottom tab nav icons
const ICON_SIZE = 30;

// Focused Icon size of the bottom tab nav icons
const FOCUSED_ICON_SIZE = 30;

// Icon Color
const ICON_COLOR = customTheme.colors.dark;

// Focused Icon color
const FOCUSED_ICON_COLOR = customTheme.colors.primary;

export const bottomTabData = [

  // My Beats Tab Data
  {
    label: "MyBeats",
    component: FirebeatsDashboardStack,
    icon: <FireIcon size={ICON_SIZE} color={ICON_COLOR} />,
    focusedIcon: (
      <FireIconSolid
        size={FOCUSED_ICON_SIZE}
        color={FOCUSED_ICON_COLOR}
      />
    ),
  },
  {
    label: "MyHealth",
    component: MybeatsStack,
    icon: <HeartIcon size={ICON_SIZE} color={ICON_COLOR} />,
    focusedIcon: (
      <HeartIconSolid
        size={FOCUSED_ICON_SIZE}
        color={FOCUSED_ICON_COLOR}
      />
    ),
  },
  {
    label: "Message",
    component: Chat,
    icon: (
      <ChatBubbleBottomCenterIcon
        size={ICON_SIZE}
        color={ICON_COLOR}
      />
    ),
    focusedIcon: (
      <ChatBubbleBottomCenterIconSolid
        size={FOCUSED_ICON_SIZE}
        color={FOCUSED_ICON_COLOR}
      />
    ),
  },
  {
    label: "MyAlerts",
    component: Notifications,
    icon: <BellIcon size={ICON_SIZE} color={ICON_COLOR} />,
    focusedIcon: (
      <BellIconSolid
        size={FOCUSED_ICON_SIZE}
        color={FOCUSED_ICON_COLOR}
      />
    ),
  },
];
