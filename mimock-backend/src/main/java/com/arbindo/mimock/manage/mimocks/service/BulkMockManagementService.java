package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;

import java.util.List;

public interface BulkMockManagementService {

    List<Mock> bulkCreateMocks(List<ProcessedMockRequest> processedMockRequestList);
}