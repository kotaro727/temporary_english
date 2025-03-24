import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// メニュー項目の型定義
interface MenuItem {
  id: string;
  icon: string;
  label: string;
  iconColor?: string;
  onPress: () => void;
}

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  slideAnim: Animated.Value;
  menuItems: MenuItem[];
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose, slideAnim, menuItems }) => {
  if (!visible) return null;

  return (
    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* メニューヘッダー */}
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>メニュー</Text>
        </View>

        {/* メニュー項目 */}
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress}>
            <Ionicons
              name={item.icon as any}
              size={20}
              color={item.iconColor || '#555'}
              style={styles.menuIcon}
            />
            <Text style={styles.menuItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#FFFFFF',
    zIndex: 20,
    paddingTop: 20,
  },
  menuHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 12,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#444444',
  },
});