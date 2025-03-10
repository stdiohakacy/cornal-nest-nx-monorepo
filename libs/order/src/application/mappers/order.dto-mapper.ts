import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { OrderItem } from '../../domain/entities/order-item.entity';
import { OrderItemDTO } from '../dtos/order-item.dto';
import { OrderAggregate } from '../../domain/aggregate-roots/order.aggregate';
import { OrderDTO } from '../dtos/order.dto';

export const orderDTOProfile: MappingProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    OrderItem,
    OrderItemDTO,
    forMember(
      (dest) => dest.productId,
      mapFrom((src) => src.productId)
    ),
    forMember(
      (dest) => dest.quantity,
      mapFrom((src) => src.quantity)
    ),
    forMember(
      (dest) => dest.price,
      mapFrom((src) => src.price.amount)
    ),
    forMember(
      (dest) => dest.currency,
      mapFrom((src) => src.price.currency)
    )
  );

  createMap(
    mapper,
    OrderAggregate,
    OrderDTO,
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.items,
      mapFrom((src) =>
        src.items.map((item) => mapper.map(item, OrderItem, OrderItemDTO))
      )
    ),
    forMember(
      (dest) => dest.status,
      mapFrom((src) => ({ status: src.status.getValue() }))
    )
  );
};
