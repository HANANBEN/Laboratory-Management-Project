package com.example.gateway_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.cloud.gateway.discovery.DiscoveryClientRouteDefinitionLocator;
import org.springframework.cloud.gateway.discovery.DiscoveryLocatorProperties;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
@EnableDiscoveryClient
public class GatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceApplication.class, args);
	}


/*
* Dynamic Route Management: No need to manually define routes for each service. Routes are automatically created based on what is registered in the service registry.
*Automatic Updates: If services are added or removed from the registry, the gateway routes are updated in real-time without needing to modify configuration files or restart the gateway.
*
* */
	/*The method defines a bean of type DiscoveryClientRouteDefinitionLocator.
It uses the provided ReactiveDiscoveryClient (rdc) to interact with the service registry (Eureka, Consul, etc.) to dynamically discover services.
It uses the DiscoveryLocatorProperties (dlp) to apply configuration to the route discovery process.
The DiscoveryClientRouteDefinitionLocator bean that is returned will automatically create and manage gateway routes based on the services available in the service registry.
*/

	@Bean
	DiscoveryClientRouteDefinitionLocator dynamicRoutes(ReactiveDiscoveryClient rdc , DiscoveryLocatorProperties dlp ){
		return new DiscoveryClientRouteDefinitionLocator(rdc , dlp);
	}

}
