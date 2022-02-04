package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.entities.Mock;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MocksDBHelper extends CrudRepository<Mock, UUID> {
}