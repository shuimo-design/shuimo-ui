/**
 * @description headless NotificationList 通知列表容器
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 通过 Teleport 挂载到 body，按 position 分组堆叠显示通知。
 * 每个位置对应一个独立的定位容器。
 */
import { defineComponent, Teleport, PropType, computed } from 'vue';
import { NotificationItem } from '@shuimo-design/ui-core/components/message/notification';
import { NotificationPosition } from '@shuimo-design/ui-core/components/message/notification/props';
import MNotification from './MNotification';
import './notification.css';

/** 所有支持的位置 */
const POSITIONS: NotificationPosition[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];

const notificationListInternalProps = {
  /** 当前通知列表（由 useNotificationQueue 注入） */
  notifications: { type: Array as PropType<NotificationItem[]>, default: () => [] },
};

export default defineComponent(
  (_props: { notifications?: NotificationItem[]; onClose?: (id: number) => void }, _ctx: any) => {
    const props = _props as Required<{ notifications: NotificationItem[] }>;
    const { emit } = _ctx;

    const handleClose = (id: number) => {
      emit('close', id);
    };

    /** 按 position 对通知分组 */
    const groupByPosition = computed(() => {
      const groups: Record<NotificationPosition, NotificationItem[]> = {
        'top-right': [],
        'top-left': [],
        'bottom-right': [],
        'bottom-left': [],
      };
      for (const item of props.notifications) {
        groups[item.position].push(item);
      }
      return groups;
    });

    return () => (
      <Teleport to="body">
        {POSITIONS.map((pos) => {
          const items = groupByPosition.value[pos];
          if (!items.length) return null;
          return (
            <div
              key={pos}
              class={['m-notification-list', `m-notification-list-${pos}`]}
            >
              {items.map((item: NotificationItem) => (
                <MNotification
                  key={item.id}
                  title={item.title}
                  message={item.message}
                  type={item.type}
                  duration={item.duration}
                  position={item.position}
                  closable={item.closable}
                  onClose={() => handleClose(item.id)}
                />
              ))}
            </div>
          );
        })}
      </Teleport>
    );
  },
  {
    name: 'MNotificationList',
    props: notificationListInternalProps,
    emits: ['close'],
  },
);
