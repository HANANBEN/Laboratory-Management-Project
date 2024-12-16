package com.example.laboratory_service.web;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RefreshScope
public class laboratoryConfigTestController {

   @Value("${laboratory.params.x}")
    private String paramx;
@Value("${laboratory.params.y}")
    private String paramy;

@GetMapping("/params")
public Map<String , String> params(){
    System.out.println(paramx);
    System.out.println(paramy);

    return Map.of("param1" , paramx , "param2" , paramy);
}

}
