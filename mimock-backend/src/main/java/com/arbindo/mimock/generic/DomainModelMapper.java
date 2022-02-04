package com.arbindo.mimock.generic;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.generic.factory.ResponseFactoryExecutor;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@Component
public class DomainModelMapper {

    @Autowired
    private ResponseFactoryExecutor responseFactoryExecutor;

    public DomainModelForMock mappedModel(Mock mock) {
        Object responseBody = responseFactoryExecutor.responseFactory(mock).responseBody();

        return DomainModelForMock.builder()
                .route(mock.getRoute())
                .responseContentType(mock.getResponseContentType().getResponseType())
                .statusCode(mock.getStatusCode())
                .responseBody(responseBody)
                .build();
    }
}