package br.com.devpaulosouza.easybuy.dto;

import br.com.devpaulosouza.easybuy.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class OrderDetailedDto {

    private UUID id;

    private Long number;

    @NotEmpty
    private List<ProductOrderDetailedDto> products;

    private BigDecimal total;

    private UUID userId;

    private String userName;

}
