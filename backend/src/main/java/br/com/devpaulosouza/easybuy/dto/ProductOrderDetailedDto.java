package br.com.devpaulosouza.easybuy.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ProductOrderDetailedDto implements Dto {

    private UUID id;

    private UUID orderId;

    private ProductDto product;

    private BigDecimal quantity;

    private BigDecimal price;

}
