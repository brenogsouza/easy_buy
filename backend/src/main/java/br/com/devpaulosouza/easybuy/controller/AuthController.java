package br.com.devpaulosouza.easybuy.controller;

import br.com.devpaulosouza.easybuy.dto.UserInputDto;
import br.com.devpaulosouza.easybuy.dto.UserLoginDto;
import br.com.devpaulosouza.easybuy.dto.UserOutputDto;
import br.com.devpaulosouza.easybuy.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

/**
 * Esse controller aqui é só encheção de linguiça, ngm usa Basic auth pra um site de venda
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/create-user")
    Mono<ResponseEntity<UserOutputDto>> createUser(@RequestBody @Valid UserInputDto userInputDto) {
        return service.createUser(userInputDto)
                .map(ResponseEntity::ok);
    }

    @PostMapping("/authenticate")
    Mono<ResponseEntity<UserOutputDto>> authenticate(
            @RequestBody @Valid UserLoginDto userInputDto,
            HttpServletResponse response
    ) {
        return service.authenticate(userInputDto)
                .map((outputDto) -> {
                    Cookie cookie = new Cookie("gambi_web_token", outputDto.getToken().toString());

                    cookie.setMaxAge(24 * 60 * 60);

                    cookie.setSecure(true);
                    cookie.setHttpOnly(true);
                    cookie.setPath("/");

                    response.addCookie(cookie);

                    return ResponseEntity.ok(outputDto);
                });
    }

}
