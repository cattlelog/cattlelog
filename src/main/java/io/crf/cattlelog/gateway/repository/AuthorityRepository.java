package io.crf.cattlelog.gateway.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.crf.cattlelog.gateway.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
